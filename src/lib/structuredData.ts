export function createSchemaGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((node) => {
      const entity: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(node)) {
        if (key !== "@context") entity[key] = value;
      }

      return entity;
    }),
  };
}
