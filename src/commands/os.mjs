import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export function os(command) {
  const cmd = command.replace("--", "");

  switch (cmd) {
    case "EOL":
      console.log(JSON.stringify(EOL));
      break;

    case "cpus":
      console.log(`CPUs length ${cpus().length}`);
      console.table(cpus().map((cpu) => ({ CPU: cpu.model.trim(), Speed: cpu.speed })));
      break;

    case "homedir":
      console.log(homedir());
      break;

      case "username":
      console.log(userInfo().username);  
      break;

      case "architecture":
        console.log(arch());
        break;

    default:
      console.log("Invalid input");
  }
}
