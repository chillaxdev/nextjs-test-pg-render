import styles from "./page.module.css";
import pg from "pg";

export default function Home() {
    return (
        <main className={styles.main}>
            <div style={{
                flex: 1
            }}>
                <h1>Test PG Render</h1>
                <br/>
                <p>{getOutput()}</p>
            </div>
        </main>
    );
}

const {Pool} = pg;
const pool = new Pool({
    host: 'dpg-cp5i4nv79t8c73eunnig-a.oregon-postgres.render.com',
    user: 'test',
    password: process.env.DB_PASS,
    database: "hello_dm83",
    max: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false,
    }
});

const getOutput = async () => {
    const res = await pool.query('SELECT * FROM public.orders');
    console.log(res.rows);
    return JSON.stringify(res.rows);
}
