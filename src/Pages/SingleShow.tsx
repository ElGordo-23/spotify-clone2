import { useParams } from 'react-router-dom';
import { useSingleShow } from '../API/getSingleShow';

export function SingleShow() {
  const { showId } = useParams();

  const { data } = useSingleShow(showId);

  console.log(data);

  return <></>;
}
