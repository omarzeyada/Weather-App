import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");

let cancelAxios = null;

export default function WeatherApp() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState("ar");

  const direction = locale === "ar" ? "rtl" : "ltr";

  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocale("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    i18n.changeLanguage(locale);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.2357&lon=30.0444&appid=85b770365117b92222f218408fc051d8",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then(function (response) {
        // handle success

        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const description = response.data.weather[0].description;
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const icon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ padding: 0 }}>
        <Card
          sx={{
            minWidth: { xs: "100%", sm: 275 },
            bgcolor: "rgb(28 52 91 / 36%)",
            color: "white",
            boxShadow: "0 11px 1px rgba(0, 0, 0, 0.05)",
            padding: { xs: "5px", sm: "10px" },
            borderRadius: "15px",
          }}
          dir={direction}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "end" },
              }}>
              <Typography
                variant='h2'
                sx={{
                  margin: "0 20px 0 0",
                  fontWeight: 600,
                  fontSize: { xs: "2rem", sm: "3.75rem" },
                }}>
                {t("Cairo")}
              </Typography>
              <Typography variant='h5' sx={{ margin: "0 20px 0 0" }}>
                {dateAndTime}
              </Typography>
            </Box>
            <Divider sx={{ bgcolor: "white" }} />
            <Grid
              container
              spacing={2}
              sx={{
                mt: "25px",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center" },
              }}>
              <Grid size={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <Typography variant='h1'>{temp.number}</Typography>

                  <img src={temp.icon} alt='' />
                </div>
                <div
                  dir={direction}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                  }}>
                  <Typography variant='h6'>{t(temp.description)}</Typography>

                  <Box
                    sx={{
                      display: { xs: "grid", sm: "flex" },
                      justifyContent: { sm: "space-between" },
                    }}>
                    <Typography variant='h5'>
                      {t("Min")} : {temp.min}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{ display: { xs: "none", sm: "block" } }}>
                      |
                    </Typography>
                    <Typography variant='h5'>
                      {t("Max")} : {temp.max}
                    </Typography>
                  </Box>
                </div>
              </Grid>
              <Grid size={6}>
                <CloudIcon
                  sx={{
                    fontSize: "200px",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "15px",
          }}
          dir={direction}>
          <Button
            variant='text'
            sx={{ color: "white" }}
            onClick={handleLanguageClick}>
            {locale === "en" ? "Arabic" : "انجليزي"}
          </Button>
        </div>
      </Container>
    </div>
  );
}

