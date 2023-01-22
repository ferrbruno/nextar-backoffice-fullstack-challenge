import Head from "next/head";
import Button from "@/components/Button";
import Link from "next/link";
import { withAuthenticationRequired } from "@/contexts/auth";
import Layout from "@/components/Layout";

function Home() {
  return (
    <Layout>
      <Head>
        <title>Nextar User Management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/users">
        <Button>Users</Button>
      </Link>
    </Layout>
  );
}

export default withAuthenticationRequired(Home);
