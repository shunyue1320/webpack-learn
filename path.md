{
  contexts: [
    TraversalContext {
      queue: [Array],
      priorityQueue: [],
      parentPath: [NodePath],
      scope: [Scope],
      state: undefined,
      opts: [Object]
    }
  ],
  state: undefined,
  opts: {
    ArrowFunctionExpression: { enter: [Array] },
    _exploded: {},
    _verified: {},
    BlockStatement: { exit: [Array] },
    Program: { exit: [Array] },
    TSModuleBlock: { exit: [Array] }
  },
  _traverseFlags: 0,
  skipKeys: null,
  parentPath: NodePath {
    contexts: [ [TraversalContext] ],
    state: undefined,
    opts: {
      ArrowFunctionExpression: [Object],
      _exploded: {},
      _verified: {},
      BlockStatement: [Object],
      Program: [Object],
      TSModuleBlock: [Object]
    },
    _traverseFlags: 0,
    skipKeys: null,
    parentPath: NodePath {
      contexts: [Array],
      state: undefined,
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Array],
      listKey: 'body',
      key: 0,
      node: [Node],
      type: 'VariableDeclaration',
      parent: [Node],
      hub: [Object],
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    },
    container: [ [Node] ],
    listKey: 'declarations',
    key: 0,
    node: Node {
      type: 'VariableDeclarator',
      start: 6,
      end: 57,
      loc: [SourceLocation],
      id: [Node],
      init: [Node],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    type: 'VariableDeclarator',
    parent: Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 57,
      loc: [SourceLocation],
      declarations: [Array],
      kind: 'const',
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    hub: {
      file: [File],
      getCode: [Function: getCode],
      getScope: [Function: getScope],
      addHelper: [Function: bound addHelper],
      buildError: [Function: bound buildCodeFrameError]
    },
    data: null,
    context: TraversalContext {
      queue: [Array],
      priorityQueue: [],
      parentPath: [NodePath],
      scope: [Scope],
      state: undefined,
      opts: [Object]
    },
    scope: Scope {
      uid: 0,
      path: [NodePath],
      block: [Node],
      labels: Map(0) {},
      inited: true,
      bindings: [Object: null prototype],
      references: [Object: null prototype],
      globals: [Object: null prototype],
      uids: [Object: null prototype] {},
      data: [Object: null prototype] {},
      crawling: false
    }
  },
  container: Node {
    type: 'VariableDeclarator',
    start: 6,
    end: 57,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: Node {
      type: 'Identifier',
      start: 6,
      end: 9,
      loc: [SourceLocation],
      name: 'sum',
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    init: Node {
      type: 'ArrowFunctionExpression',
      start: 12,
      end: 57,
      loc: [SourceLocation],
      id: null,
      generator: false,
      async: false,
      params: [Array],
      body: [Node],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    leadingComments: undefined,
    innerComments: undefined,
    trailingComments: undefined
  },
  listKey: undefined,
  key: 'init',
  node: Node {
    type: 'ArrowFunctionExpression',
    start: 12,
    end: 57,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: null,
    generator: false,
    async: false,
    params: [ [Node], [Node] ],
    body: Node {
      type: 'BlockStatement',
      start: 19,
      end: 57,
      loc: [SourceLocation],
      body: [Array],
      directives: [],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    leadingComments: undefined,
    innerComments: undefined,
    trailingComments: undefined
  },
  type: 'ArrowFunctionExpression',
  parent: Node {
    type: 'VariableDeclarator',
    start: 6,
    end: 57,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: Node {
      type: 'Identifier',
      start: 6,
      end: 9,
      loc: [SourceLocation],
      name: 'sum',
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    init: Node {
      type: 'ArrowFunctionExpression',
      start: 12,
      end: 57,
      loc: [SourceLocation],
      id: null,
      generator: false,
      async: false,
      params: [Array],
      body: [Node],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    leadingComments: undefined,
    innerComments: undefined,
    trailingComments: undefined
  },
  hub: <ref *1> {
    file: File {
      _map: Map(0) {},
      opts: [Object],
      declarations: {},
      path: [NodePath],
      ast: [Node],
      scope: [Scope],
      metadata: {},
      code: 'const sum = (a,b)=>{\n  console.log(this);\n  return a+b;\n}',
      inputMap: null,
      hub: [Circular *1]
    },
    getCode: [Function: getCode],
    getScope: [Function: getScope],
    addHelper: [Function: bound addHelper],
    buildError: [Function: bound buildCodeFrameError]
  },
  data: null,
  context: TraversalContext {
    queue: [ [Circular *2] ],
    priorityQueue: [],
    parentPath: NodePath {
      contexts: [Array],
      state: undefined,
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Array],
      listKey: 'declarations',
      key: 0,
      node: [Node],
      type: 'VariableDeclarator',
      parent: [Node],
      hub: [Object],
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    },
    scope: Scope {
      uid: 0,
      path: [NodePath],
      block: [Node],
      labels: Map(0) {},
      inited: true,
      bindings: [Object: null prototype],
      references: [Object: null prototype],
      globals: [Object: null prototype],
      uids: [Object: null prototype] {},
      data: [Object: null prototype] {},
      crawling: false
    },
    state: undefined,
    opts: {
      ArrowFunctionExpression: [Object],
      _exploded: {},
      _verified: {},
      BlockStatement: [Object],
      Program: [Object],
      TSModuleBlock: [Object]
    }
  },
  scope: Scope {
    uid: 1,
    path: [Circular *2],
    block: Node {
      type: 'ArrowFunctionExpression',
      start: 12,
      end: 57,
      loc: [SourceLocation],
      id: null,
      generator: false,
      async: false,
      params: [Array],
      body: [Node],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined
    },
    labels: Map(0) {},
    inited: true,
    bindings: [Object: null prototype] { a: [Binding], b: [Binding] },
    references: [Object: null prototype] {},
    globals: [Object: null prototype] {},
    uids: [Object: null prototype] {},
    data: [Object: null prototype] {},
    crawling: undefined
  }
}