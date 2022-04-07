export const generateQueryKeys = (baseName: string) => {
  const keys = {
    all: [baseName] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...keys.lists(), { filters: JSON.stringify(filters) }] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (id: string) => [...keys.details(), id] as const,
  };

  return keys;
};
