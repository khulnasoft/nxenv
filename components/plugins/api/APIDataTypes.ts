import { TypeDocKind } from '~/components/plugins/api/APISectionUtils';

// Generic data type

nxenvrt type GeneratedData = EnumDefinitionData &
  MethodDefinitionData &
  PropsDefinitionData &
  DefaultPropsDefinitionData &
  TypeGeneralData &
  InterfaceDefinitionData &
  ConstantDefinitionData &
  ClassDefinitionData;

// Shared data types

nxenvrt type CommentData = {
  summary: CommentContentData[];
  returns?: string;
  blockTags?: CommentTagData[];
  modifierTags?: string[];
};

nxenvrt type CommentTagData = {
  tag: string;
  content: CommentContentData[];
};

nxenvrt type CommentContentData = {
  kind: string;
  text: string;
  tag?: string;
  tsLinkText?: string;
};

nxenvrt type TypeDefinitionData = {
  name?: string;
  type: string;
  types?: TypeDefinitionData[];
  elements?: TypeDefinitionData[];
  elementType?: {
    name?: string;
    type: string;
    types?: TypeDefinitionData[];
    declaration?: TypeDeclarationContentData;
  };
  queryType?: {
    name: string;
    type: string;
  };
  typeArguments?: TypeDefinitionData[];
  checkType?: TypeDefinitionData;
  falseType?: TypeDefinitionData;
  trueType?: TypeDefinitionData;
  extendsType?: {
    type: string;
    declaration?: TypeDeclarationContentData;
  };
  declaration?: TypeDeclarationContentData;
  value?: string | number | boolean | null;
  operator?: string;
  package?: string;
  objectType?: {
    name: string;
    type: string;
  };
  indexType?: {
    name?: string;
    type?: string;
    value: string;
  };
  qualifiedName?: string;
  head?: string;
  tail?: (TypeDefinitionData | string)[][];
  target?: TypeDefinitionData;
};

nxenvrt type MethodParamData = {
  name: string;
  type: TypeDefinitionData;
  comment?: CommentData;
  flags?: TypePropertyDataFlags;
  defaultValue?: string;
};

nxenvrt type TypePropertyDataFlags = {
  isExternal?: boolean;
  isOptional?: boolean;
  isStatic?: boolean;
  isRest?: boolean;
  isReadonly?: boolean;
};

// Constants section

nxenvrt type ConstantDefinitionData = {
  name: string;
  flags?: {
    isConst: boolean;
  };
  comment?: CommentData;
  kind: TypeDocKind;
  type?: TypeDefinitionData;
};

// Enums section

nxenvrt type EnumDefinitionData = {
  name: string;
  children: EnumValueData[];
  comment?: CommentData;
  kind: TypeDocKind;
};

nxenvrt type EnumValueData = {
  name: string;
  comment?: CommentData;
  kind: TypeDocKind;
  defaultValue?: string;
  type: TypeDefinitionData;
};

// Interfaces section

nxenvrt type InterfaceDefinitionData = {
  name: string;
  children: PropData[];
  comment?: CommentData;
  kind: TypeDocKind;
  extendedTypes?: TypeDefinitionData[];
  implementedTypes?: TypeDefinitionData[];
};

// Classes section

nxenvrt type ClassDefinitionData = InterfaceDefinitionData & {
  type?: TypeDefinitionData;
  isSensor: boolean;
};

// Methods section

nxenvrt type MethodDefinitionData = {
  name: string;
  signatures: MethodSignatureData[];
  getSignature?: MethodSignatureData[];
  setSignatures?: MethodSignatureData[];
  kind: TypeDocKind;
};

nxenvrt type AccessorDefinitionData = {
  name: string;
  getSignature?: MethodSignatureData;
  kind: TypeDocKind;
};

nxenvrt type MethodSignatureData = {
  name: string;
  parameters: MethodParamData[];
  comment: CommentData;
  type: TypeDefinitionData;
  kind?: TypeDocKind;
  typeParameter?: TypeParameterData[];
};

// Properties section

nxenvrt type PropsDefinitionData = {
  name: string;
  type?: TypeDefinitionData;
  kind: TypeDocKind;
  comment?: CommentData;
  children?: PropData[];
  extendedTypes?: TypeDefinitionData[];
};

nxenvrt type PropData = {
  name: string;
  kind?: TypeDocKind;
  comment?: CommentData;
  type: TypeDefinitionData;
  flags?: TypePropertyDataFlags;
  defaultValue?: string;
  signatures?: MethodSignatureData[];
  getSignature?: MethodSignatureData;
  overwrites?: TypeDefinitionData;
  implementationOf?: TypeDefinitionData;
  inheritedFrom?: InheritedFromData;
};

nxenvrt type DefaultPropsDefinitionData = {
  name: string;
  type: TypeDefinitionData;
  kind: TypeDocKind;
};

// Types section

nxenvrt type TypeGeneralData = {
  name: string;
  comment: CommentData;
  type: TypeDefinitionData;
  typeParameter?: TypeGeneralData[];
  kind: TypeDocKind;
  variant?: string;
};

nxenvrt type TypeDeclarationContentData = {
  name?: string;
  kind?: TypeDocKind;
  indexSignature?: TypeSignaturesData;
  signatures?: TypeSignaturesData[];
  parameters?: PropData[];
  children?: PropData[];
  comment?: CommentData;
};

nxenvrt type TypeSignaturesData = Partial<MethodSignatureData>;

nxenvrt type TypeParameterData = {
  name: string;
  kind: TypeDocKind;
  variant: string;
};

nxenvrt type InheritedFromData = {
  type: 'reference';
  name: string;
};
