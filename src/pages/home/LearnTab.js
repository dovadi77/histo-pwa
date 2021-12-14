/* eslint-disable jsx-a11y/alt-text */
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import theme from "../../theme";

const LearnTab = () => {
  const navigate = useNavigate();
  const dummyList = [
    {
      title: "Fisika",
      image:
        "https://kuliahdimana.id/public/news/1a3130e0aef06d8b431cb1811b2b1e79.jpg",
    },
    {
      title: "Matematika",
      image:
        "https://d1bpj0tv6vfxyp.cloudfront.net/fobiapadamatematikabenarkahbisaterjadihalodoc.jpg",
    },
    {
      title: "Biologi",
      image:
        "https://i2.wp.com/www.bladjar.com/wp-content/uploads/2021/07/Inilah-25-Cabang-Biologi-yang-Perlu-Diketahui.jpg",
    },
    {
      title: "Ekonomi",
      image:
        "https://koinworks.com/wp-content/uploads/2020/10/resesi-ekonomi-1024x576.jpg",
    },
  ];

  const ItemLearn = (item) => {
    return (
      <Card style={{ margin: theme.spacing(4) }}>
        <CardActionArea>
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/detail-learn", { state: item.item })}
          >
            <Typography variant="h3" color="rgba(255, 255, 255, 0.8)">
              {item.item.title}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            height="140"
            image={item.item.image}
            alt={item.title}
          />
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Box>
      {dummyList.map((data) => (
        <ItemLearn key={data.title} item={data} />
      ))}
    </Box>
  );
};

export default LearnTab;
