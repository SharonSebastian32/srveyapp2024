import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
    </div>
  );
}
