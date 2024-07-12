import { SideBarMenu } from "../../_components/side-bar-menu";

const DocumentsPage = () => {
  return (
    <div className="p-3 flex items-start gap-2 flex-col md:flex-row md:items-center">
      <SideBarMenu />
      <p>This is a restricted page to authenticate users only!</p>
    </div>
  );
};
export default DocumentsPage;
