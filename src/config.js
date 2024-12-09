const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const config = {
  apiUrl: `${apiBaseUrl}`,
};

const businessRoles = {
  owner: 'owner',
  student: 'student'
}

export {config, businessRoles};
