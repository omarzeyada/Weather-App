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
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SunnyIcon from "@mui/icons-material/Sunny";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";

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
    icon: null,
    humidity: null,
    wind: null,
    Precipitation: null,
    uv: null,
    visible: null,
  });
  const [city, setCity] = useState("Cairo");

  const [locale, setLocale] = useState("ar");

  const direction = locale === "ar" ? "rtl" : "ltr";

  function handleLanguageClick() {
    if (locale === "en") {
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

    if (!city.trim()) return;

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=44be3bb41179422ca76120510261405&q= ${city}&aqi=no`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )

      .then(function (response) {
        // handle success
        console.log(response.data);

        const responseTemp = Math.round(response.data.current.temp_c);
        const description = response.data.current.condition.text;

        const icon = response.data.current.condition.icon;
        const humidity = response.data.current.humidity;
        const wind = response.data.current.wind_kph;
        const precipitation = response.data.current.precip_mm;
        const uv = response.data.current.uv;
        const visible = response.data.current.vis_km;

        setTemp({
          number: responseTemp,
          description: description,
          icon: icon,
          humidity: humidity,
          wind: wind,
          Precipitation: precipitation,
          uv: uv,
          visible: visible,
        });
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, [city, locale, i18n]);

  const containerStyle = {
    backgroundColor: temp.number > 25 ? "#e64a19" : "#1976d2",
    transition: "background-color 0.5s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    margin: 0,
    padding: "20px",
  };

  const MoreStyle = {
    display: "flex",
    alignItems: "center",
    mb: "10px",
    bgcolor: "rgb(255 255 255 / 20%)",
    padding: "10px",
    borderRadius: "10px",
    fontWeight: 600,
  };
  const MoreIconStyle = {
    marginRight: "10px",
    width: "35px",
    height: "35px",
  };

  return (
    <div style={containerStyle}>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ padding: 0 }}>
        <TextField
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          label={locale === "en" ? "Search City" : "أدخل المدينة"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          color='Black'
          sx={{mb:"10px"}}
        />
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
                {t(city || "Cairo")}
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

                  <img style={{ width: "120px" }} src={temp.icon} alt='' />
                </div>
                <div
                  dir={direction}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                  }}>
                  <Typography variant='h6'>{t(temp.description)}</Typography>
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

        <Accordion
          sx={{
            minWidth: { xs: "100%", sm: 275 },
            bgcolor: "rgb(28 52 91 / 36%)",
            color: "white",
            boxShadow: "0 11px 1px rgba(0, 0, 0, 0.05)",
            padding: { xs: "5px", sm: "10px" },
            borderRadius: "15px",
            mt: "15px",
          }}
          dir={direction}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              {t("More Details")}
            </Typography>
          </AccordionSummary>

          <CardContent>
            <Box>
              <Typography variant='h5' sx={MoreStyle}>
                <ThunderstormIcon sx={MoreIconStyle} />
                {t("Precipitation")} : {temp.Precipitation}%
              </Typography>
              <Typography variant='h5' sx={MoreStyle}>
                <AirIcon sx={MoreIconStyle} /> {t("Wind Speed")} : {temp.wind}{" "}
                {t("km/h")}
              </Typography>
              <Typography variant='h5' sx={MoreStyle}>
                <WaterDropIcon sx={MoreIconStyle} /> {t("Humidity")} :{" "}
                {temp.humidity}
                {t("%")}
              </Typography>
              <Typography variant='h5' sx={MoreStyle}>
                <SunnyIcon sx={MoreIconStyle} /> {t("UV")} : {temp.uv}
              </Typography>
              <Typography variant='h5' sx={MoreStyle}>
                <VisibilityOutlinedIcon sx={MoreIconStyle} /> {t("Visibility")}{" "}
                : {temp.visible} {t("km")}
              </Typography>
            </Box>
          </CardContent>
        </Accordion>

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
