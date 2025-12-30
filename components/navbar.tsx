import { createClient } from "@/prismicio";
import NavbarClient from "./navbar-client";

const Navbar = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return <NavbarClient settings={settings.data} />;
};

export default Navbar;
