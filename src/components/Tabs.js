import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabContent from "./TabContent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // const REACT_URL_API = "http://10.128.49.125:5000/piramideApi";
  //const REACT_URL_API= "http://186.24.0.85:5050/node/express/servicios/api"
  // const REACT_URL_API= "http://10.20.80.13:5050/node/express/servicios/api"
  const REACT_URL_API= "https://emergencia24horas.oceanicadeseguros.com/node/express/servicios/api"

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Cotizaciones emitidas vs no emitidas" {...a11yProps(0)} />
          <Tab label="Cotizaciones Oceanica" {...a11yProps(1)} />
          <Tab label="Cotizaciones por Productos" {...a11yProps(2)} />
          <Tab label="Cotizaciones por Perfil" {...a11yProps(3)} />
          <Tab label="Pólizas Emitidas por Productos" {...a11yProps(4)} />
          <Tab label="Pólizas Emitidas por Perfil" {...a11yProps(5)} />
          {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent
          titulo="Porcentajes Totales"
          url={`${REACT_URL_API}/Ver_Totales`}
          urlGraph={`${REACT_URL_API}/Ver_Totales`}
          urlGraph2={`${REACT_URL_API}/Ver_CotizacionesEmit`}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent
          titulo="Cotizaciones Piramide"
          url={`${REACT_URL_API}/Ver_Cotizaciones`}
          urlGraph={`${REACT_URL_API}/Ver_Cotizaciones_Productos`}
          urlGraph2={`${REACT_URL_API}/Ver_CotizacionesEmit`}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent
          titulo="Cotizaciones por Productos"
          url={`${REACT_URL_API}/Ver_Cotizaciones_Productos`}
          urlGraph={`${REACT_URL_API}/Ver_Cotizaciones_Productos`}
          urlGraph2={`${REACT_URL_API}/Ver_CotizacionesEmit`}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContent
          titulo="Cotizaciones por Perfil"
          url={`${REACT_URL_API}/Ver_Cotizaciones_Perfil`}
          urlGraph={`${REACT_URL_API}/Ver_Cotizaciones_Perfil`}
          urlGraph2={`${REACT_URL_API}/Ver_CotizacionesEmit`}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabContent
          titulo="Cotizaciones Emitidas por Productos"
          url={`${REACT_URL_API}/Ver_CotizacionesEmit`}
          urlGraph={`${REACT_URL_API}/Ver_CotizacionesEmit`}
          urlGraph2={`${REACT_URL_API}/Ver_CotizacionesEmit`}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TabContent
          titulo="Cotizaciones Emitidas por Perfil"
          url={`${REACT_URL_API}/Ver_Emisiones_Perfil`}
          urlGraph={`${REACT_URL_API}/Ver_Emisiones_Perfil`}
          urlGraph2={`${REACT_URL_API}/Ver_Emisiones_Perfil`}
        />
      </TabPanel>
    </div>
  );
}
