/* eslint-disable jsx-a11y/alt-text */
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroller";
import theme from "../../theme";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import "react-loading-skeleton/dist/skeleton.css";

const List = ({ token, setToken, setTitle, setBack }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const { response, setConfig } = useAPI();
  const { state } = useLocation();

  const loadMore = () => {
    if (response) {
      if (response.data.metadata.max_page > page) {
        setTimeout(() => {
          setMore(true);
          setPage(page + 1);
        }, 1000);
      } else {
        setMore(false);
      }
    }
  };

  useEffect(() => {
    setTitle(`Level ${state[1].toUpperCase()}`);
    setBack(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get List list
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setTimeout(() => {
          setList([...list, ...response.data.latest]);
          if (response.data.metadata.max_data < 11 && page === 1) {
            setMore(false);
          }
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`game?level=${state[0]}&page=${page}`, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConfig, token, page]);

  const ItemLearn = (item) => {
    item = item.item;
    return (
      <Card style={{ margin: `${theme.spacing(4)} 0` }}>
        <CardActionArea>
          <Box className="material-filter" onClick={() => navigate("detail", { state: item })}>
            <Typography variant="h5" color="rgb(255, 255, 255)" textAlign={"center"} sx={{ margin: "0 0.5em" }}>
              {item.title}
            </Typography>
          </Box>
          <CardMedia component="img" height="160" image={item.banner} alt={item.title} />
        </CardActionArea>
      </Card>
    );
  };

  const SkeletonLoad = () => {
    return (
      <div style={{ margin: `${theme.spacing(4)} 0` }}>
        <div style={{ height: "160px" }}>
          <Skeleton height={160} />
        </div>
      </div>
    );
  };

  const WaitingData = () => {
    let res = [];
    for (let index = 0; index < 3; index++) {
      res.push(<SkeletonLoad key={Math.random() * 10} />);
    }
    return <>{res}</>;
  };

  return (
    <InfiniteScroll initialLoad={false} loadMore={loadMore} hasMore={more} loader={<SkeletonLoad key={Math.random() * 10} />}>
      <Box>{list.length > 0 ? list.map((data) => <ItemLearn key={Math.random() * 10} item={data} />) : <WaitingData />}</Box>
    </InfiniteScroll>
  );
};

export default List;
