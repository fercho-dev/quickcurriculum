'use client'
import TemplateSelector from "./TemplateSelector";
import withAuth from "../hoc/withAuth";

function Templates() {
  return (
    <TemplateSelector />
  );
}

export default withAuth(Templates);