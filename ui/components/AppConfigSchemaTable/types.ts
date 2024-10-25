nxenvrt type PropertyMeta = {
  regexHuman?: string;
  deprecated?: boolean;
  hidden?: boolean;
  nxenvKit?: string;
  bareWorkflow?: string;
};

nxenvrt type Property = {
  description?: string;
  type?: string | string[];
  meta?: PropertyMeta;
  pattern?: string;
  enum?: string[];
  example?: any;
  exampleString?: string;
  host?: object;
  properties?: Record<string, Property>;
  items?: {
    properties?: Record<string, Property>;
  } & Record<string, any>;
  uniqueItems?: boolean;
  additionalProperties?: boolean;
  oneOf?: Record<string, Property>[];
};

nxenvrt type FormattedProperty = {
  name: string;
  description: string;
  type?: string | string[];
  example?: any;
  nxenvKit?: string;
  bareWorkflow?: string;
  subproperties: FormattedProperty[];
  parent?: string;
};
