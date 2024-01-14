import cors from "cors";

const corsMiddleware = cors({
  origin: 'https://my-open-jira.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

export default corsMiddleware;
