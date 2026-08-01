// Spells "INDI" + "CODE" = INDICODE, each letter a 4x3 block glyph.
const logo = {
  left: ["                   ", "▀██▀ █▀▀▄ █▀▀█ ▀██▀", "_██_ █__█ █__█ _██_", "▀██▀ ▀~~▀ ▀▀▀▀ ▀██▀"],
  right: ["             ▄     ", "█▀▀▀ █▀▀█ █▀▀█ █▀▀█", "█___ █__█ █__█ █^^^", "▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀"],
}

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"

// Indian tricolour: saffron / white / green, one band per wordmark row.
const ROW_COLORS = [
  { fg: "\x1b[38;2;255;153;51m", shadowFg: "\x1b[38;2;89;54;18m", shadowBg: "\x1b[48;2;89;54;18m" }, // saffron
  { fg: "\x1b[38;2;255;153;51m", shadowFg: "\x1b[38;2;89;54;18m", shadowBg: "\x1b[48;2;89;54;18m" }, // saffron
  { fg: "\x1b[38;2;255;255;255m", shadowFg: "\x1b[38;2;89;89;89m", shadowBg: "\x1b[48;2;89;89;89m" }, // white
  { fg: "\x1b[38;2;19;136;8m", shadowFg: "\x1b[38;2;7;48;3m", shadowBg: "\x1b[48;2;7;48;3m" }, // green
]

function wordmark(pad = "") {
  const draw = (line: string, colors: (typeof ROW_COLORS)[number]) =>
    [...line]
      .map((char) => {
        if (char === "_") return `${colors.shadowBg} ${reset}`
        if (char === "^") return `${colors.fg}${colors.shadowBg}▀${reset}`
        if (char === "~") return `${colors.shadowFg}▀${reset}`
        if (char === " ") return " "
        return `${colors.fg}${char}${reset}`
      })
      .join("")

  return logo.left.map((line, index) => {
    const colors = ROW_COLORS[index] ?? ROW_COLORS[ROW_COLORS.length - 1]!
    const left = draw(line, colors)
    const right = draw(logo.right[index] ?? "", colors)
    return `${pad}${left} ${right}`
  })
}

export function sessionEpilogue(input: { title: string; sessionID?: string }) {
  const weak = (text: string) => `${dim}${text.padEnd(10, " ")}${reset}`
  return [
    ...wordmark("  "),
    "",
    `  ${weak("Session")}${bold}${input.title}${reset}`,
    `  ${weak("Continue")}${bold}indicode -s ${input.sessionID}${reset}`,
    "",
  ].join("\n")
}
