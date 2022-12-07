import React, {useEffect, useState} from "react";
import Loading from './Loading';
import {fetch} from '../utils/fetch';
import {ApiData} from '../models/api-data';
import {Race} from '../models/race';
import RaceComp from "./Race";
import Error from './Error';

export default function App() {
  const sessionName = 'cma22';
  let timer: number|undefined;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<any>(undefined);
  const [data, setData] = useState<ApiData<Race>|undefined>(undefined);

  const scheduleFetch = (sec: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      async () => {
        timer = undefined;
        await execFetch();
      },
      sec * 1000);
  }
  const execFetch = async () => {
    setErr(undefined);

    const baseUrl = 'https://carrera-live.rohmer.rocks';
    try {
      setData(await fetch<ApiData<Race>>(`${baseUrl}/api/sessions/${sessionName}`));
      setLoading(false);
      scheduleFetch(1);
    } catch (e) {
      setErr(e);
      scheduleFetch(5);
    }
  }

  useEffect(
    () => {
      execFetch().then();
    },
    [],
  )

  return (
    <div>
      {loading && <Loading />}
      {data?.data?.slots?.length && !err && <RaceComp race={data.data} date={data.date} />}
      {!data?.data?.slots?.length || err && <Error error={err ?? "Keine Slots gefunden"} /> }
    </div>
  )
}
