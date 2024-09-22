import React from "react";

import { ServiceProvider } from "@core/providers.js";
import { BlogRoll } from "./features/blog-roll/component.js";


export const App = ({ system }) => (
  <React.StrictMode>
    <ServiceProvider value={system}>
      <BlogRoll />
    </ServiceProvider>
  </React.StrictMode>
);
