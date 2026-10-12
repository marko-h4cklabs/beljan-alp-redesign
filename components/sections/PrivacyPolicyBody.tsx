import { Fragment } from "react";
import type { PrivacyBlock, PrivacySection } from "@/content/privacy";

function Block({ block }: { block: PrivacyBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="leading-relaxed text-ink-soft">{block.text}</p>;

    case "p-strong":
      return <p className="font-semibold leading-relaxed text-ink">{block.text}</p>;

    case "lines":
      return (
        <p className="leading-relaxed text-ink-soft">
          {block.lines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      );

    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-amber">
          {block.items.map((item) => (
            <li key={(item.strong ?? "") + item.text}>
              {item.strong && <strong className="font-semibold text-ink">{item.strong}</strong>}
              {item.text}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-card border border-sage/20 shadow-soft">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-cream-dark">
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-display font-semibold text-forest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-cream-dark/40" : undefined}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 align-top leading-relaxed text-ink-soft">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function PrivacyPolicyBody({ sections }: { sections: PrivacySection[] }) {
  return (
    <div className="space-y-14">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold text-forest">
            {section.number}. {section.heading}
          </h2>
          <div className="mt-4 space-y-4">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
