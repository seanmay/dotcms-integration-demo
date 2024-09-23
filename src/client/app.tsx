import React from "react";

import { ServiceProvider } from "@core/providers.js";
import { BlogPage } from "./features/blogs/component.js";


export const App = ({ system }) => (
  <React.StrictMode>
    <ServiceProvider value={system}>
      <BlogPage />
    </ServiceProvider>
  </React.StrictMode>
);
