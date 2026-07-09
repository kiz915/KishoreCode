// Run with: npm run seed
// Requires .env.local with NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
// Idempotent-ish: re-running will create duplicate rows unless you truncate first
// (truncate tracks, modules, lessons, problems cascade -- see comment at bottom).

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { curriculum } from "../data/curriculum";
import { problemsSeed } from "../data/problems-seed";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  console.log("Seeding tracks, modules, lessons...");

  // lessonId lookup: `${trackSlug}::${moduleTitle}::${lessonTitle}` -> lesson uuid
  const lessonLookup = new Map<string, string>();

  for (const track of curriculum) {
    const { data: trackRow, error: trackErr } = await supabase
      .from("tracks")
      .insert({ slug: track.slug, name: track.name, description: track.description })
      .select()
      .single();
    if (trackErr) throw trackErr;

    for (const mod of track.modules) {
      const { data: modRow, error: modErr } = await supabase
        .from("modules")
        .insert({
          track_id: trackRow.id,
          title: mod.title,
          description: mod.description,
          order_index: mod.order_index,
        })
        .select()
        .single();
      if (modErr) throw modErr;

      for (const lesson of mod.lessons) {
        const { data: lessonRow, error: lessonErr } = await supabase
          .from("lessons")
          .insert({
            module_id: modRow.id,
            title: lesson.title,
            order_index: lesson.order_index,
            summary: lesson.summary,
            content: `## ${lesson.title}\n\n${lesson.summary}\n\n_Full lesson content coming soon._`,
            code_examples: [],
          })
          .select()
          .single();
        if (lessonErr) throw lessonErr;

        lessonLookup.set(`${track.slug}::${mod.title}::${lesson.title}`, lessonRow.id);

        // seed a not_started progress row so dashboard queries are simple joins
        await supabase.from("lesson_progress").insert({ lesson_id: lessonRow.id });
      }
    }
  }

  console.log(`Seeded ${lessonLookup.size} lessons. Seeding problems...`);

  let inserted = 0;
  let skipped = 0;
  for (const p of problemsSeed) {
    const key = `${p.trackSlug}::${p.moduleTitle}::${p.lessonTitle}`;
    const lessonId = lessonLookup.get(key);
    if (!lessonId) {
      console.warn(`No lesson match for "${p.title}" (${key}) — skipping`);
      skipped++;
      continue;
    }

    const { data: probRow, error: probErr } = await supabase
      .from("problems")
      .insert({
        lesson_id: lessonId,
        title: p.title,
        difficulty: p.difficulty,
        statement: p.statement,
        constraints: p.constraints ?? null,
        sample_input: p.sample_input ?? null,
        sample_output: p.sample_output ?? null,
        hints: p.hints ?? [],
        tags: p.tags ?? [],
        pattern_tags: p.pattern_tags ?? [],
      })
      .select()
      .single();
    if (probErr) throw probErr;

    await supabase.from("problem_progress").insert({ problem_id: probRow.id });
    inserted++;
  }

  console.log(`Done. Inserted ${inserted} problems (${skipped} skipped for missing lesson match).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// To re-seed from scratch, run this in the Supabase SQL editor first:
// truncate tracks, modules, lessons, problems, lesson_progress, problem_progress, streaks cascade;
