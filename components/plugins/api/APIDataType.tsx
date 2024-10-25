import { CodeBlock } from '~/components/base/code';
import { TypeDefinitionData } from '~/components/plugins/api/APIDataTypes';
import { resolveTypeName } from '~/components/plugins/api/APISectionUtils';
import { CODE } from '~/ui/components/Text';

const typeDefinitionContainsObject = (typDef: TypeDefinitionData) =>
  typDef.type === 'reflection' && typDef.declaration?.children;

type APIDataTypeProps = {
  typeDefinition: TypeDefinitionData;
  sdkVersion: string;
  inline?: boolean;
};

nxenvrt const APIDataType = ({ typeDefinition, sdkVersion, inline = true }: APIDataTypeProps) => {
  const { type, declaration, types, elementType, typeArguments } = typeDefinition;

  const isObjectDefinition = type === 'reflection' && declaration?.children?.length;
  const isIntersectionWithObject =
    type === 'intersection' && types?.filter(typeDefinitionContainsObject).length;
  const isUnionWithObject =
    (type === 'union' || (elementType && elementType.type === 'union')) &&
    types?.filter(typeDefinitionContainsObject).length;
  const isObjectWrapped =
    type === 'reference' &&
    typeArguments &&
    typeArguments?.filter(typeDefinitionContainsObject).length;

  return isObjectDefinition || isIntersectionWithObject || isUnionWithObject || isObjectWrapped ? (
    <CodeBlock inline={inline} key={typeDefinition.name}>
      {resolveTypeName(typeDefinition, sdkVersion)}
    </CodeBlock>
  ) : (
    <CODE key={typeDefinition.name} className="[&>span]:!text-inherit">
      {resolveTypeName(typeDefinition, sdkVersion)}
    </CODE>
  );
};
