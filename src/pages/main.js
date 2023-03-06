import React, { useEffect, useState } from "react";
import { Link as NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link, Pagination, PaginationItem, Stack, TextField } from "@mui/material";
import MainPageStyles from "./main.module.css";
import { getPosts } from "../utils/api";

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(parseInt(location.search.split("=")[1] || 1));
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getPosts(query, page).then((data) => {
      setPosts(data.hits);
      setTotalPage(data.nbPages);

      if (data.nbPages < page) {
        setPage(1);
        navigate("/news-pagination", { replace: true });
      }
    });
  }, [navigate, page, query]);

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Поиск"
        variant="outlined"
        value={query}
        sx={{ marginBottom: "20px", marginTop: "20px" }}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Stack spacing={2}>
        {posts.map((post, index) => (
          <Link key={index} href={post.url ? post.url : post.story_url} variant="body2">
            {post.title ? post.title : post.story_title}
          </Link>
        ))}
      </Stack>
      <Pagination
        className={MainPageStyles.pagination}
        sx={{ marginX: "auto", marginTop: "10px" }}
        page={page}
        count={totalPage}
        showFirstButton
        showLastButton
        onChange={(_, page) => setPage(page)}
        renderItem={(item) => (
          <PaginationItem component={NavLink} to={`/news-pagination/?page=${item.page}`} {...item} />
        )}
      />
    </>
  );
};

export default MainPage;
