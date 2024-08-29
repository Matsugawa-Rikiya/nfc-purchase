import { sql } from "@vercel/postgres";

export async function getUserByNfcId(cardid: string) {
  try {
    const { rows } =
      await sql`SELECT user_id as userId,name,nfc_id as cardId FROM tbl_users WHERE nfc_id = ${cardid}`;
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to execute query");
  }
}

export async function putUser(name: string, userid: string, cardid: string) {
  try {
    const { rows } =
      await sql`INSERT INTO tbl_users (user_id,name,nfc_id) VALUES (${userid},${name},${cardid})`;
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to execute query");
  }
}

export async function putSales(userid: string, ticket: number, book: number) {
  try {
    const results = [];

    if (ticket > 0) {
      const ticketResult = await sql`
        INSERT INTO tbl_ticket_purchases (user_id, ticket_type, amount)
        VALUES (${userid}, 'バラ売り', ${ticket})
      `;
      results.push(ticketResult);
    }

    if (book > 0) {
      const bookResult = await sql`
        INSERT INTO tbl_ticket_purchases (user_id, ticket_type, amount)
        VALUES (${userid}, 'セット売り', ${book})
      `;
      results.push(bookResult);
    }

    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to execute query");
  }
}
