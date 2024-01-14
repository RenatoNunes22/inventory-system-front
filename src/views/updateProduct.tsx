import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type UpdateProductProps = {
  productType: string;
};

export default function UpdateProduct({ productType }: UpdateProductProps) {
  const [search, setSearch] = React.useState<number | string>("");

  // const searchProduct = () => {
  //   axios
  // }

  return (
    <Grid
      container={true}
      display={"flex"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"start"}
      xs={12}
      lg={12}
      xl={12}
      sx={{ backgroundColor: "#0000" }}
    >
      <Grid
        item
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        xs={12}
        lg={12}
        xl={3}
        gap={1}
        sx={{ backgroundColor: "#0000" }}
      >
        <TextField
          fullWidth
          required
          id="outlined-basic"
          label={
            productType === "Device"
              ? "Numero de Series/MEI"
              : "Nome do acessorio"
          }
          variant="outlined"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{
            height: "55px",
            backgroundColor: "#5e6464",
            color: "#FFFF",
          }}
          onClick={() => null}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
