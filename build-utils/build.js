const buildModules = require("./buildModules");
const addModules = require("./addModules");

async function build() {
  const modules = await buildModules();
  await addModules(modules);
}

build().then(() => {
  console.log("done bulding");
});
