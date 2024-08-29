export type checkApiKeyProjectIdResponse = {
  id?: Number;
  api_key?: String;
  project_id?: String;
  created_at?: String;
};

export type pointsdataResponse = {
  id: Number;
  project_id: String;
  event_name: String;
  wallet_address: String;
  points: Number;
  created_at: String;
};
