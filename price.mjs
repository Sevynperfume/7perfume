#!/usr/bin/env node
// SEVYN Perfumes - update: new prices (50 ml 599, 30 ml 299) (2 files). Run inside the project folder (the one with package.json and src):  node <this file>
// Files:
//   src/features/perfumes/data/perfumes.data.ts
//   src/features/perfumes/components/price-tag.tsx
const OBSOLETE = [];
const DATA = `
H4sIAAAAAAACCq1a63bcuJF+lQp3dlbyIdkX3WnLju3xZJ1jz+hYHuckap0YTRbZiECAAUBJPdqeH3mrvE6eJKcAkk2q27Ycr36o
SVwLX9VXVQB4F+RcoAmSi7ugCpLA6HSUI7O1RjOqUOd1iWaUMcu6t5jeYmuCMMAgCWqbHwdhkAZJwMtKaQt30DR9XbICYQW5ViXM
gt+PBJ+3w0ScKmfB45lsutllhXAHPyATqEP4UbNCM5niT8piCPT/R1ZysfTPb9iSWp350boHN2X39oFpzqQNoXl4na2lieMRzWic
CDM5GsFblV6BWxy8w0qwFOGG2wUwVzhnBuHvNeolcGl4hu0qY4P6mqcYWxO7cUg8A6kq0c9lFwjnrz78+SfI2zWBWSBaA1zCqKrn
gqcjg9co/9pB/uiv1FhS49hcF37kc0sicgMMnHwLJTLUCdRVxiwCt15gmlAjE3DNRI0k1Uw6dD9wvIFTuANSegLGai6LxyDYHEX7
CqsWjz8wIWi5FWow/FcMQaNgll8jWAV2wawr/h8DuZMjhvcLhJxrY8FplyQlWVJ1jRpqgxkoCSnTmQl9BdOqNijcdExmbaGN4YWy
VqCbwFBXV2VsnXEFBu1j916p9Aq9FNTGALfGr7xaKKvimUyVNBbO3//yw+ufE7f+i0s4hYuZhA6GWTAhiGdB2CIxC3KtpIVrjjez
AFbhsLkkBW/p0irX1W/pN93ogxm3SnMSWGmrGbdbuu1tdGtxWKht7fc326coLVRaUZOmx+XjFp0Pr1/96TyBd5gqnT3pqBI2cD0l
i6EZZsHBuBSzIGnwDH3h3mah10viYe6L5tVyX7xWjZVmy249/zngX48FwGU4k43hP3oEzosYEGTqRFFnzT1/+MSIung6gp2DMZRi
N4Q4jkeEg7dievNrGsXwaDSTeS1Ty5WEwlNqh/q3hAtBshLXb2TN67eM6/UL2aNpzXg3GTi9i0uvJY221tI3jUtW7ezQ4y6cPoWd
Ow+P0Wky8NFOHjcXPIOP391lXK9G391Rx5hgWn2EBLq33QZlJmxCrUn8VQjf3ZHk7sE1dYivPrrGq93dxzO5avE9Z2VLbcKr0jxF
8iIa8LrxOM6zQqmr1oloLGrBtG9Mpn8jCZc6vQK70KouFh7rhvGv//LqfE10niWd+fZswamPSkiWNxulpa4SmEzH49DPmsDByUmj
klnQY54ffu/+8Htbh98bDH/cG33aG90Pdm8Gb1SDOc66osEkZ2vP2E01PVhPNaHnZqp2VO8WgFHsksZ2bGg8goFK1F4XGeasFp37
b6z6nq2XmHH2GUvf9fbq9XXdzJHcC93OWztlelu+I6Ed35zTXw3suiltzNOTNhlwzkvgsYo7wEI/qPODF66KZ5e7PcPtWHXXCRp2
47clF+PL2Je5ENoZ+4uai8zj5vwUCG5sm4X8RIDkLq+ZBVAxro2Lt4LSm3uAut47rsZ07rqXC3lYLy6f7ibD7Omea9j5ef43TG2M
0mrejbhLir/YMtzlxeVunAtm35ICLoSv5RZLc0nwN2jTu9cRPTq9NGppdXzhsferJb1Sw9hUgtudWZDMAg81/XVw97skzS8J2k8H
nUQOc+q68orr/I2fu2Rc+swyaTLMNqp5ZmWuLJrMAtfb2+ks8GlbY5KmqbxZMGtYVf1Ul3N0DDqZHB0dHJ2Mp0dHfgQfSvzUZsE0
Zu10c81k1g3djJgqSVFJM9IzVb66dckAZAhnjCZvGmbNEtbLocmGlMVbl077yduQ1fGql/6sSeMkbGnjPU00HrdgAHgSz4I5snQR
VQKZwa6yxeoFVcLZsNKyQnDp6l9yq2sTQsmldW6fgWHCLmGuEX9dd8nQpJpXDorWHmbBc8jYktJHn1AyyjElMJi7PDGG/uygKpSm
Td7nmhcLyi4EMwtQOaTcaiVDEFgq6SRJlRJOrhCMyi115tIqMLWMNK9QYgaMPKfykucazQLmzHDhElkJGTEJMgpKVkGqkZVLyHnR
ZbU0bgjmistI8CuEsjZXJAwr5xqtxRjekJghpb+Ya0TXs2QZurh4w3RJCJh4rRTaDJBXb94LlJk3x18kN3jbNWzZQxkTmsVaN1xa
Kv2vPXaSpvtdeRzH3ndvKHxDy20q4FxT0niojvZWVZQDOs0rmaTOAPwwbwj7QclbkqYR8DJsh1gg0y6RDJ57/JNc19wuG2FIA0mh
EWW/E23VXJ8feTFo/7wBOyH0l+suq3YdzdY3S8Dqug0kREtZJLAfH7YlSBnOS1UTgJPJtCkmtVvMnjtUp+PpYTTeiybjBtgmlH+J
ddNN1qlyzozl6SblNmp6fHtXl2TjzC5QO2MypbqizWuK0nyJbm9UnRHByHTnaCzcsCVtypr5wFimbUMxUzF9JWjrOEddsLIhSapZ
2hQLll5BhVVFkcPxpVK1NkTnjOkr0HXpujgrT7mUrFTSbyfdtpsbqGqNIIkikaptAqauKoHt+sJ2WW6RnjtkOYslVMymC1ULvsGc
yfHDmcPI1W8y52Q+Tff2tjKnp5qhph7GmRcNlAOOvHBAnjkgE1PxdLmdK+/qMjE36PNC4p9HdLNLx5Q3HsfkRqmsIctrj2jbiYrO
Wizvc+6hBDreSqDD/U8TaD/qGPFAAu1tEChjmVvUkDw/DEr7gWodDQS7drbh+cNkxgQh9AXyvBTIZEgROOcZNtEO81xpK9AYsYRK
CW4WmMXgpOgHrF4saiLXgFWtRCGU6hqbOMW4XoJBSvmMaWKr49IVT12UKbgsOu4ZpJDp2EdRyYciz1gXttbr3Aw2028PNtkBOzre
RplWTWvdPIwq/cjhQ9QW6rxpcEtyoTQT23lz3kDYH+0PDrrPUOdtba7agEIdzjv4WjZ9LUuOtrLk5PjTLJlGk/2vY8n+BksqbiyL
BIuu6WGDLmdUCm8YfBhU93hzxiUy8sohuJ+1Sx96z+2k+WPN06U/DhBsmddifXjqjxTd8VAMQzlgXmvTBiKX0IWwQD1nApguFTde
CkrioFrL1+NOqrmpegJX6iajM4hrrgTaNom0qk5d8qjRcKlqQzvwjEmKsS4j5JII7UjluRe2AYgyedGkeo0n+XRM2ht/M8GOshO2
l24j2IaGt6j1YZTbTN+ee7TbwBD27aHLwbbndf0W1O+DQ74jqmevB7uNalto+NxtxnpR75uD1cE2Gh4ffZqFB9H0K5O9g00Wirqs
ohKjutqkINXBW4Rfqm38O6e1g9JM0hWIYTkdYjt7U/WXQtY7ni5CICdHWx2Zwd9rjlZQZKoFShtDb/J+uHJGGIIZzO3CDO3gjed/
kyYSwSsu21QwVdqL1yRxy1bmGH5ArEJw7hNYwTQ9wY6qs13aH7m9FrduY7SgRDJcb5ToFoXLwkdBU2FKh+sqTZnhSm7uniabAe1H
peF/e+5qTbg2ObpPuIP9wxO2lXADZd7X4MOo5rX6s0O2Y9w2Ip0Rsmcdsv287dzj+pkg9rwD+ec62/1PA9fW9O7k8NOMOYwmX5nd
HW4wRvNff42YVht0eUcVz3sV/RyP6YyVqgzBqjxvdtvOQT8kv1s4/+6PHrIY2okG5w5alYx2Smk3U4nCtgkb7VMUXdWtZ0+ZZiUK
YCkd7Pmw0kvVfEwphLqhLVUnagzeQGhSVVOySNWmLphe0imdvy1MhTJIGalZQqFqXbqYpTS4e0O3rdpysjD+5v3R/Pj4cG++jRo9
rQ1U9cAThQbUz22C3ntod156XHe/FDu+JWPbejBw9JltzVE0Pv46wz/aMHy3nsgycbVh+t4m3veresb/pwW3dH3NyOf/jZmSS2+C
10xyIdgXzP/cHWWRfUsycOpIV/jG8LlwV8O8kEpja5kkRZ8Z1yiu0S7hZi2FPyVjslg2ZwVprbW7uJ8LpcqGNE1GRm1fFcvKciZb
6T1bth7CvWUZK5hJmW6XBzeaVRW6842UtmqNKJTDb5Lg+CsCRJey3KNBenI8Pz7cRoOBDu8p7mFU8Mo8IxiHZ2MOyJceyM9mYFvy
rQ7fP3p8t+ya1vufNcAfPMD9LMyL198j/f/shvb3Pk2u46g7u25vuoMwWARJkM4PcsQxTg/y4/l4chSsws9995KqslISpTUjd28W
WVbE1tx+5tOXXOmS2TN3SXnvyxdf1f/k5Q5Seb9VbbloP0rh0qLO6UMUN+B7VpxpVRnvLJqbPOluIdzlB902vetfk4Zb70nhhtKz
BS/oYNAumD/lMyjcYZ3r6G+egO4Nnw2moNuxZ875lLMA/g9mQZk1D6JwUnsxzhfqxg07C27/G1SezwKYs6zoRibBztk1l8WzBOZK
EQ9d71QwY+ha7Fn3gcrgJsdfGze3KaZM6HMjj8QssHhrI1F0N55NCcka+um7sovJuLq9hOo2msQH3UVrmW2OdyseNt6kGW/ajSaK
zdH2NofzAg+HuzVuqPgAqmU07iRcf6Jw3ldX/7OfwS35QO8hYFzE8Ntv//rHPyfhdDz+7Tf41z/+eXByAgdjpySvnOYCqbt3bG1v
5661qlJX/g4VThsLCHsKhVNP5LUqYZUMLXhw95txkxKr3SUZ3fj/7vQUaplhzuni5fvvXeFTP/njdT+V53Da7/0M3jK7iLWqZbaz
s0O9It9rF0Y0yC48gsl4vAsJjHsDkTk5s3KXv5cO4/VtqXczT0zF5HpFp3ep3JkFXFJMjXKBt0D/Igot/i40IgdJtVCwKrqNpu53
6a4Y1+Psrp62DnX7DLmSNjJY8rkSFCPnpN5I1qXbd5vYL2/19K7neHaawicjGrKb4K4H1ffftwtzUz9dP5MgG1I4myxri1mUK42F
g3iLNITxCuhCPHJfKJzefRw4JPhuIKdr/nE1mB1gs8lAupEZtL/rGd5wVZ8G1aDII7pxRQ1uKbSuWgiYF1GhRDaatLwDhz9F67oE
hwLV+8U6xhL0Ks9Xjj/3AKe/vvBPRl1VW9zr0dxYN5EqO57uYYb7Rycn6eH0OAtWl2EwF2pO32perv4NE+RXhbgpAAA=
`;

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const looksLikeProject = (dir) => existsSync(join(dir, "package.json")) && existsSync(join(dir, "src"));
let target = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
if (!process.argv[2] && !looksLikeProject(target) && looksLikeProject(join(target, "7perfumes"))) target = join(target, "7perfumes");
// No refusal: an existing project is updated; an empty or other folder gets the whole project written into it.
mkdirSync(target, { recursive: true });
const fresh = !looksLikeProject(target);
console.log("SEVYN Perfumes - full sync\n" + (fresh ? "No existing project here, writing a full copy into: " : "Updating project: ") + target + "\n");

let payload;
try {
  payload = JSON.parse(gunzipSync(Buffer.from(DATA.replace(/\s+/g, ""), "base64")).toString("utf8"));
} catch {
  console.error("This script is damaged (the paste was probably cut off or changed). Copy it again in full.");
  process.exit(1);
}
const files = payload.files.map((f) => ({ ...f, c: f.c.replace(/@@BLOB(\d+)@@/g, (_, i) => payload.blobs[Number(i)]) }));

let written = 0, unchanged = 0, removed = 0;
for (const f of files) {
  const dest = join(target, f.p);
  const data = Buffer.from(f.c, f.e);
  if (existsSync(dest) && readFileSync(dest).equals(data)) { unchanged++; continue; }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, data);
  written++;
  console.log("  wrote    " + f.p);
}
for (const p of OBSOLETE) {
  const dest = join(target, p);
  if (existsSync(dest)) { rmSync(dest, { force: true }); removed++; console.log("  removed  " + p); }
}
const obsoleteDirs = new Set();
for (const p of OBSOLETE) for (let d = dirname(p); d !== "." && d !== "public" && d !== "src"; d = dirname(d)) obsoleteDirs.add(d);
for (const dir of [...obsoleteDirs].sort((a, b) => b.split("/").length - a.split("/").length)) {
  try { const d = join(target, dir); if (existsSync(d) && readdirSync(d).length === 0) rmdirSync(d); } catch {}
}
const bad = files.filter((f) => {
  const dest = join(target, f.p);
  return !existsSync(dest) || createHash("sha256").update(readFileSync(dest)).digest("hex").slice(0, 16) !== f.h;
});
console.log("\nDone: " + written + " written, " + unchanged + " already up to date, " + removed + " old files removed.");
if (bad.length) { console.error("WARNING: these files did not verify: " + bad.map((f) => f.p).join(", ")); process.exit(1); }
console.log("All 2 files verified.");
