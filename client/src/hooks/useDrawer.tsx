import { useState } from 'react';
import CustomDrawer from 'src/components/Drawer/custom-drawer';

export const useDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const CustomDrawerTemplate = (
    <CustomDrawer open={open} onClose={() => onClose(false)} />
  );

  return { CustomDrawerTemplate, showDrawer };
};
