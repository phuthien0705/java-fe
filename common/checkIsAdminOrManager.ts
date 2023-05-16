const checkIsAdminOrManager = (roles: string[] | undefined) => {
  if (roles && (roles.includes('admin') || roles.includes('manager')))
    return true;
  return false;
};

export default checkIsAdminOrManager;
