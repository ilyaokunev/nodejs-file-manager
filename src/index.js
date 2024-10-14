import { stdin, stdout, argv } from "node:process";
import { homedir } from "node:os";
import { goUp } from "./commands/up.mjs";
import { cd } from "./commands/cd.mjs";
import { ls } from "./commands/ls.mjs";
import { cat } from "./commands/cat.mjs";
import { add } from "./commands/add.mjs";
import { rn } from "./commands/rn.mjs";
import { cp } from "./commands/copy.mjs";
import { rm } from "./commands/rm.mjs";
import { os } from "./commands/os.mjs";
import { hash } from "./commands/hash.mjs";
import { compress } from "./commands/compress.mjs";
import { decompress } from "./commands/decompress.mjs";

let CURRENT_PATH = homedir();

const username = process.argv[2].split("=")[1];

function init() {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${CURRENT_PATH}`);

  stdin.setEncoding("utf-8");

  stdin.on("data", (chuck) => commandMapper(chuck.trim()));

  process.on("SIGINT", () => process.exit());
  process.on("exit", () => console.log(`Thank you for using File Manager, ${username}, goodbye!`));
}

async function commandMapper(chunk) {
  const [command, ...args] = chunk.split(" ");

  const firstArg = args[0];

  const fnWithValidatedFirstArg = (fn) => {
    if (firstArg) {
      return fn;
    } else {
      console.log("Invalid input");
      return () => {};
    }
  };

  switch (command) {
    case "up":
      CURRENT_PATH = goUp(CURRENT_PATH);
      break;

    case "cd":
      CURRENT_PATH = (await fnWithValidatedFirstArg(cd)(CURRENT_PATH, firstArg)) ?? CURRENT_PATH;
      break;

    case "ls":
      ls(CURRENT_PATH);
      break;

    case "cat":
      fnWithValidatedFirstArg(cat)(CURRENT_PATH, firstArg);
      break;

    case "add":
      fnWithValidatedFirstArg(add)(CURRENT_PATH, firstArg);
      break;

    case "rn":
      if (firstArg && args[1]) {
        rn(CURRENT_PATH, firstArg, args[1]);
      } else {
        console.log("Invalid input");
      }
      break;

    case "cp":
      if (firstArg && args[1]) {
        cp(CURRENT_PATH, firstArg, args[1]);
      } else {
        console.log("Invalid input");
      }
      break;

    case "rm":
      fnWithValidatedFirstArg(rm)(CURRENT_PATH, firstArg);
      break;

    case "mv":
      if (firstArg && args[1]) {
        await cp(CURRENT_PATH, firstArg, args[1]);
        await rm(CURRENT_PATH, firstArg);
      } else {
        console.log("Invalid input");
      }
      break;

    case "os":
      fnWithValidatedFirstArg(os)(firstArg);
      break;

    case "hash":
      fnWithValidatedFirstArg(hash)(CURRENT_PATH, firstArg);
      break;

    case "compress":
      if (firstArg && args[1]) {
        compress(CURRENT_PATH, firstArg, args[1]);
      } else {
        console.log("Invalid input");
      }
      break;

    case "decompress":
      if (firstArg && args[1]) {
        decompress(CURRENT_PATH, firstArg, args[1]);
      } else {
        console.log("Invalid input");
      }
      break;

    case ".exit":
      process.exit();

    default:
      console.log("Invalid input");
  }
  console.log(`You are currently in ${CURRENT_PATH}`);
}

init();
