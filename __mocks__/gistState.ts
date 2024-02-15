export const mockUser1 = {
  login: "user1",
  id: 1,
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
};

export const mockUser2 = {
  login: "user2",
  id: 2,
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
};

export const mockFile1 = {
  filename: "mock1.txt",
  type: "text/plain",
  language: "Text",
  raw_url: "",
  size: 13,
  content: "MOCK 1",
};

export const mockFile2 = {
  filename: "mock1.txt",
  type: "text/plain",
  language: "Text",
  raw_url: "",
  size: 13,
  content: "MOCK 2",
};

export const mockGists = [
  {
    description: "GIST 1",
    id: 1,
    files: {
      [mockFile1.filename]: mockFile1,
      [mockFile2.filename]: mockFile2,
    },
    public: false,
    created_at: "2024-02-08T17:35:10Z",
    updated_at: "2024-02-08T20:03:59Z",
    comments: 0,
    user: null,
    comments_url: "",
    owner: mockUser1,
    truncated: false,
  },
  {
    description: "GIST 2",
    id: 2,
    files: {
      [mockFile1.filename]: mockFile1,
    },
    public: false,
    created_at: "2024-02-08T17:35:10Z",
    updated_at: "2024-02-08T20:03:59Z",
    comments: 0,
    user: null,
    comments_url: "",
    owner: mockUser2,
    truncated: false,
  },
];
