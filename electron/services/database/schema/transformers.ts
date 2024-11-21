/**
 * KeyMapper defines a structure for mapping keys from the source type
 * to the corresponding keys in the destination type.
 *
 * @template TDestination - The target destination object type
 * @template TSource - The source object type
 */
export type KeyMapper<TDestination, TSource> = {
  [K in keyof TDestination]?: keyof TSource;
};


/**
 * Transforms a source object into the destination type using a key mapper.
 *
 * @param source - The source object to transform
 * @param mapper - A map defining how keys in the destination type correspond to keys in the source type
 * @returns The transformed destination object
 */
export function mapKeys<TDestination, TSource extends object>(
  source: TSource,
  mapper: KeyMapper<TDestination, TSource>
): TDestination {
  const result: Partial<TDestination> = {};

  for (const [destinationKey, sourceKey] of Object.entries(mapper)) {
    if (sourceKey && (sourceKey as keyof TSource) in source) {
      (result as any)[destinationKey] = source[sourceKey as keyof TSource];
    }
  }

  return result as TDestination;
}