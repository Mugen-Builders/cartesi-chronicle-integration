import { createApp } from "@deroll/app";

const app = createApp({ url: "http://127.0.0.1:8080/host-runner" });

// log incoming advance request
app.addAdvanceHandler(async (data) => {
  await app.createNotice({ payload: data.payload });
  console.log(`Notice created succesfully`, data);
  return "accept";
});

app.addInspectHandler(async (data) => {
  console.log(data);
});

// start app
app.start().catch((e) => process.exit(1));
