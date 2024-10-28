export const getTemplatedTitle = (
  title: string,
  template = '| nxenv.khulnasoft.com',
): string => `${title} ${template}`;
