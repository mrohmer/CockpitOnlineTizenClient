import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import Slots from './Slots';
import Error from './Error';
import {ApiData} from '../../models/api-data';
import {Race} from '../../models/race';
import {fetch} from '../../utils/fetch';
import {Slot} from '../../models/slot';

export default function Session ({sessionName, onBack}: Record<'sessionName', string> & Partial<Record<'onBack', () => void>>) {
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

    const baseUrl = 'https://carrera-live.rohmer.rocks';
    try {
      setData(await fetch<ApiData<Race>>(`${baseUrl}/api/sessions/${sessionName}`));
      setErr(undefined);
      setLoading(false);
      scheduleFetch(1);
    } catch (e) {
      setLoading(false);
      setErr(e);
      scheduleFetch(5);
    }
  }

  useEffect(
    () => {
      execFetch().then();
      return () => {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }
      }
    },
    [],
  )
  const handleBack = () => onBack?.();
  useEffect(
    () => {
      document.addEventListener('tizenhwkey', handleBack);
      return () => {
        document.removeEventListener('tizenhwkey', handleBack);
      }
    }
  );

  const compareSlots = ({id: a}: Slot, {id: b}: Slot) => a.localeCompare(b);

 return (
   <div>
     {loading && <Loading />}
     {data?.data?.slots?.length && !err
       ? <Slots race={{...data.data, slots: data.data.slots.sort(compareSlots)}} date={data.date} />
       : <Error error={err ?? "Keine Slots gefunden"} /> }
   </div>
 )
}
