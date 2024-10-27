import SelectPlayers from './Select Players/SelectPlayers';
import PlayersTable from './Players Table/PlayersTable';

export default function Players() {


  return (
    <div className='flex flex-col py-6 gap-4'>

      <SelectPlayers />

      <PlayersTable />


    </div>
  )
}
