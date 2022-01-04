import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Leaderboard({ rows, user = 0, overflow = true }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: overflow ? 550 : "none" }}>
        <Table stickyHeader={overflow} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Skor Tertinggi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              let name = row.user.name ? row.user.name.split(" ") : null;
              if (name) {
                name = name[0] + " " + (name[1] === undefined ? "" : name[1].substring(0, 1).toUpperCase() + ".");
              }
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell className={user === index + 1 ? "user-rank" : ""}>{index + 1}</TableCell>
                  <TableCell size="small" padding="none">
                    <img src={row.user.image} alt={row.user.username} className="player-picture" />
                  </TableCell>
                  <TableCell className={user === index + 1 ? "user-rank" : ""}>{"'" + row.user.username + "' " + name ?? ""}</TableCell>
                  <TableCell className={user === index + 1 ? "user-rank" : ""}>{row.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
