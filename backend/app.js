const express= require('express');
const cors= require('cors');
const cookieParser= require("cookie-parser");
const studentroute = require('./routes/v1/studentinfoRoute');

const app= express();

//middlewares for handeling the urls
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


// app.use('/v1', routes);
app.use('/api',studentroute);

//routes import
const userRouter =require('./routes/v1/user.route');
const adminRouter=require('./routes/v1/admin.route');
const companyRouter=require('./routes/v1/company.route');
// const healthcheckRouter =require("./routes/healthcheck.routes.js");
// const tweetRouter =require("./routes/tweet.routes.js");
// const subscriptionRouter =require("./routes/subscription.routes.js");
// const videoRouter =require("./routes/video.routes.js");
// const commentRouter =require("./routes/comment.routes.js");
// const likeRouter =require("./routes/like.routes.js");
// const playlistRouter =require("./routes/playlist.routes.js");
// const dashboardRouter =require("./routes/dashboard.routes.js");

//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admins",adminRouter)
app.use("/api/v1/company",companyRouter)
// app.use("/api/v1/tweets", tweetRouter)
// app.use("/api/v1/subscriptions", subscriptionRouter)
// app.use("/api/v1/videos", videoRouter)
// app.use("/api/v1/comments", commentRouter)
// app.use("/api/v1/likes", likeRouter)
// app.use("/api/v1/playlist", playlistRouter)
// app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register





module.exports = app;







