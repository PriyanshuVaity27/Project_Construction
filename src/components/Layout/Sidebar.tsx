import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Building, 
  MessageSquare, 
  Settings,
  LogOut,
  HardHat,
  MapPin,
  FileText,
  Briefcase,
  Package,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pending-actions', label: 'Pending Actions', icon: Clock },
    { id: 'leads', label: 'Lead Tracker', icon: UserCheck },
    { id: 'developers', label: 'Developer List', icon: HardHat },
    { id: 'contacts', label: 'Contact List', icon: MessageSquare },
    { id: 'projects', label: 'Projects', icon: Building },
    { id: 'inventory', label: 'Inventory List', icon: Package },
    { id: 'land', label: 'Land', icon: MapPin },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const employeeMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Tracker', icon: UserCheck },
    { id: 'developers', label: 'Developer List', icon: HardHat },
    { id: 'contacts', label: 'Contact List', icon: MessageSquare },
    { id: 'projects', label: 'Projects', icon: Building },
    { id: 'inventory', label: 'Inventory List', icon: Package },
    { id: 'land', label: 'Land', icon: MapPin },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : employeeMenuItems;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <img 
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIRERUSEBAVFhUWGBcYFhUXGBgRERsWGhYYFhgXGBgYHSggGB8mIBYXITEhJSkrLi4vGCE0OD8uNygtLisBCgoKDg0OGxAQGy4lICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMgAyAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAEIQAAEDAgMFBQUGAwcEAwAAAAEAAgMEEQUSIQYxQVFhEyJxgZEHFDKhsSNCUmJy0cHh8DRDY5KissJTgpPiJCUz/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAMEAQIFBgf/xAAuEQACAgEEAQQCAgEDBQAAAAAAAQIDEQQSITEFEyJBURQyI2FxYoGhFTVCRJH/2gAMAwEAAhEDEQA/APcUAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEBi6xlGMmVkyEAQBAYKwwYY4Hcf63ImYR9LJkIAgCAIAgCAIAgCAIAgCAIAgCAICsbT4o5p7KMkaXcRv14Lz/ltdKt+nB/5OXrtTKD2xKNU1srHZmSODuYJv581zqb5p5yc6FsovKL9sXjxrICX27RhyvtoDoCHW4XB9QV6fS3epDLO7prvVjyWFWiwEBzVtfHCLyOA+p8BxUF2prqXuZHZbCC9zKji+0r5LtiuxvP75/ZcDU+Tna9lfCOTfrnJ4rLdh0HZxMZyaB8l6CiLjWos61S2xR1KYkCAIAgCAIAgCAIAgCAIAgCAIAgCAp21dIWyGS3dcBr1Gll5Xy+ncbvV+GcTyFUlLcvkpGIcVSqXu4KMU0Xb2a4U+GB8kgIMrg4A78oGh87k+Fl6nQ1bYZZ3tHFxjyWauxGOEXkcB03nyCku1VVPMmTW3wrXuKziG1L3aRDKOZ1d+wXE1PmJS4r4OVd5GT4gV6eZzjdziTzJuVyJ2Sm8yZz5ScnlszQszSxt5vaPmpdNDdYkb0xUppHqIXtl0emRlZMhAEAQBAEAQBAEAQBAEAQEBtDWyQuYWO0INwdRpb91xPKaq2hxlDo52tunThxOJm1LxvjafAkKnHzs/mJXj5N45R9Da0/9H/V/JSrzv8ApNv+p/6TZFtlDe0jXN6/EP3+St0+Wrn+ywTw8hCXfBNwzRTsu0tew+Y8Cujmu2P2i4pQsjxyc0eBUzXZhC2/UX9Adyjjo6Yc4NFp64yzg4cdx7s7xxfFxdvA/crn6/yKr9lfZU1etVfth2VGaUuJc4kk7ydSvNyslZLMjjSnKbyzeygdl7SQhjOBO8/pbxViGke3fPhEy08sbpcIj5XC+l7dd/y3KCXZC1z/AEd2zbc1VEOpPoCf4K94+vN8cFrRrNyO/aZ2IGscyjqy37PtMhY0Rta0ZficDmLnA6W4r6DpvQ9L+SP+50b3bv8AYyCj20xSna19REHscAQ5zMlwRcWcyw48lbeh01nFbwyBay2v90WfAvaHS1BDJbwPPB5vGT0fu9bKlf46ypZXKLVWthP+i4Arn4wXVgysAysgIAgCAIAgCAIAgITamnzQ5h9wg+W4rkeZpc6c/RQ19easr4Kc0XNvTldeUjFs4Si3waJzlvfQjhxW2zD5G2S7IesmVuEPo3WWdmxuOOgqmNJ+zlIY4cLnRrvI28rrraG1wnh9F/SWuE8fB6Zjtd2MRcD3jo3xPFdHX6j0aW/n4OjqbXXBsoLnX3rxrcpSyeceZPKJyjoGU8fb1IufuR9eF78fp9O3RpoaeHrXf7I6dVMaY+pPv6IPEa98zy558BwA5Bc7UXyuln4KV10rHlnE5yhREic2IizVN/wtcfM2H8Sur4qvNufov+PjmzcXesgYWuz6AtIc6+U5eIzcBqfVeqi5Z4OvJRXMiuYpjkTjFFGYzASRIXAFmUXGTLvHQ7tyu16axJzfZQs1dbaguih7a4NTwzAUxu1zQ7eHNFye6D5cea6+htlZD+Ts5+q2Rn7D72R2xlonCKYl9Putvczqzp+X0Wms0EbFuh2WNLrHF7ZdHsNLUMkY18bg5rgC1w1BB4rzkouDw+ztRllZXRuWDYIAgCAIAgCAIAgNU8Qe0tIuCCCtLIKcXFmsoqUcM89xOkdDIWO4bjzHArxWq006bHFnm9RVKqZyOxKMjLUMLhuD2m0jR9HDoVYosjLi1ZJK7IviaOeTBIZv7PWxXP3JbxO8OvkFehpa5fpInjp4y5jI1M2GrQ9r29m4BwNw8W0N+IViGkmmSw0s08ly20l1jbfgSflZV/Ny4ikY8nLmKRybMYeJHGV/wM9M38t/mFB4zSqb9SXSItFQn738Edj2JmeQn7o0aOnPzUGu1Tvsx8fBBqb3ZPBFOcqeMcFf4wanOW2EZ6ReNgqTLE+Uj4zYeDf5k+i9J4qlRg5fZ2dBXthlfJJ7SYe+eLJG6xBuRuDhy/rku9prY1zzI311E7a8RZEbIYSWPkdIwWtk1sdQbOHyVvW6hSSUWUPGaacXLej42h2NY+O9M0B4LjlJ0cDra/C1tE0uvcJe/on1Xj4tZr7PM66kIJBFiCQR13L0EJKSycXmLwyy+zLaEwy+5yu+zkP2d/uyb8vQO+viuV5LTKUfVj2uzsaDUSztkesLgnYCAygCAIAgCAIAgMICPxfC2VDMrtCNzhvBVXU6WNy5ILqI2rDPPcZ2VqoycrO0bwLNT/l3+i4s/HWwfHJyp6KyD4K6/Aqxxs2lm843NHqRZbQ01n0YWnt+ETeCezaokIdVPETfwts+Q+e5vjr4K9To5Z9xbq0kv/JkjiuDw0jxFA02ygkklzi65F9egG5cnyda9VRiVNbBKaUSexg+60TYh8T9D9Xft5q9qH+LpFWu2Wb/AODTqK7ZTHFefXJyDW4raK5HZ0YVh76iQRs/7jwDeJVrS6Z3WYLFFLslg9SpKcRsaxgsGgAL1lcIwSij0EIKMUkb1IbmlzmRtJNmjUngLk6rZJy4XJHKUa1lvCKptFijCQ6KZ7v8OxER/VuuOmq6Om08upI4Ws11cn/HLP8ARTcbqXTOzua0HjlGW/U8yuxp61XHCOdO52Syys1YLSHNNnNIII3gjUFWXiS2k1Umnk942exEVNNFN+NgJ6O3OHkQQvIX1uu1xPUUz3RySKhRIZWQEAQBAEAQBAEAQBAEBhAUnEhnxEN5OZ6ABxXnL16mu2nHtW7VHxt1OTKxnANv6n/1CeXllqJjyLbkisHXQb1yYxk+jnKOeiYwvZeeYgvHZs5u+Lyb+66Wn8bbZzLhF2jRTn+3BesKwuOnZljHiTq4nmSvQUaeFSxE69NUK1hHcpybg1TTtYLuIA6rMYuTwkR2Wwrjukyn43iRmdYXDBuHPqV1tNRs5Z5LX+Qd8sL9SGlarkeznRIqrarUGWIMgq9u9WEyzBnpfsmqM1CWn+7le0eBDX/8yvN+TWL8npNDL+Iuy5pdCyAgCAIAgCAIAgCAIAgMFYBRw/8A+z1/Hb/QvOr/ALhk4/8A7Z9bZ4nRQTtFTHK+RzAQG6My5nDU3HG69HX4hauTkyfVuqLzNENFteBpTUscX5j33+un8V16PB1VHOnr9vEI4NtHjUxlZJJIXZTe24W3Gw3birNukgoOMVgpR1lvrKcnk9Aq6nLE57dbNJHLdcLhRhme1nprrsVOceSrNxeod989bAfsun+PUvg8tLyGrk3yfFRXOezK83INwfLcsxpUXlFe3W2XQ2yOB5VhFNdnPKVJE3XuZF1ZVqBYgQNed6nRagXj2WPLYGj8dVJ6Np739QF5zy0v5kj0Gh/U9HXOOiZQBAEAQBAcWKYhHTROlmdlY3ed/gAOJWk5qCyzWU1BclRZ7RA83ioZ3sG9wFz6AEfNVfy3norfk56RZMC2ggrGkxOIc34o3DLI3xCsV2qxE8LFPolgpSQygCAwsA8+xeTssRzHcHsPkQ2/8V5u9+nrcnFtezU5Of2wUJy09QB8JdG4/q7zf9rvVe98Patzh9k3ka8xUilUMi7kuDgzWWTlLIoJrPZWl3wWOgxuVjQ0OBaOBAItyXOs0kJPJZr8hbUtqfBJwYtFI3s5WZAbas0b5jgqs9POEsxeS5XrqbouFix/ZwTUpMhbG0uBPdtqCOd1PG3EMyOZZppSu218r4O9uzUpGrmjpqVC9bFdHQh4Sx8yeDRV7LzBpLXNceW4n1W8NdHPJmXhbI8xeStYvhFRCzPJEQ3de4cP9JXQo1VVjwnyV56O6qOZoqNfJvV5MzCLfZ6PsLTFjqWIjVlPJO/9U72hgPI5QV5HXW+rqXj4PQ6WO1JF/UJeMoAgMFB8FV2wqAyWmM08kMI7QuewkEyANyNNgdLZ/RVrpYks9Fe6XK+jmh287R5dHSSGmaQH1B0DdbZsttR53stVqcvrg1Wo3PrgisQjkmoIm1Uhf2NYG1F94jDyzUjfo9pv1CjacqlvZo05RW5lpxPETSSQDKz3eRzYtBldG8/AeRabW3CynlNQa+iZy2Y+jXtW2OBra0WbJE9gLhoXxueGPYeehJHIgJaopbxZtj7yxKcm7PpZMhAYQFE2/pcsjJeDhlPi3UfI/JcDyteJqZyNfDDUiWMDcSw4xuOrm2vykbud6gHwK7fjNU0o2L4LccXU4PHI2uie6OQZXsJa4HgQvbwmpxyvk4F0NsmiYpZ1iSyVJr4JOCdV5QRBKK6Z1snUTjjoj2Fi2TpRI8yF3wWsBzPErna6bj7cHa8PplKTm30XBctHpwgNc0TXjK9ocDvBFx6LMW0zWUd3ZU9o2wPlbRMhjF29pUSZWgRwNNzrbRzrWB4b1brnOMHbJ/4/sq2qLltSN2w95u3rCLCd9oxyhj7jNOHH0XMpe5ub+SShZzL7LUpiwZWQEBhDBSMQ2kkMrhLRsfRCbsHPdZxDw7KXFp4Zunmqc7Xu5XBWna89cErtFQ+8Re5072x6xmRgFvsC43y8B8J9CpLI71sizeyO5bYs+8d2TgqyXuL2OcLOdG7IXAaAOFiHeYus2UqZmymMyIPs6o295805trmc9ot5hosonpYJZbI3p4JZbObEsap5amKnnMNW178rcjSHRl1gCSCWvHhYi3FYlZFyUXyauSk0nyX4BXOi4fSyAgMIY7IvaHDfeIHM+8NWH8w3ft5qrq6PVrwQ6mr1IYKTsjjPu0xil0Y42dfTK8aXPLkf5LkaK90T2SOZpbvRlsl0dvtE2RM//wAqmbeVo77Bve0cR+YfML2vj9cq3sl0/wDgs6zSqa3RPNaap4HQjgvQ8Po4U68EnBVdVo4ogcM9nYyq6rRwI3Hk7KDF3wvD43WPEcCORUN2mVywyam2dEsxL7sztF73mHZ5SwC5vcG9+nRcPV6T0McnpNHq3flNdE/dUsF7KKdtJte5kwpKFgmqHGx4sZ42489QBZX6NInH1LHhFO3U+7ZDlkLicL8ww+OTtKqpIdWTcGs/D0aBoBy/UuZrNR6kvTh0atPO1dvs9DoKRsMbI2CzWNDWjoBZbRWEXYrB0rY2CAICKxvHIaQNMxPeNgGjM78zrDgBqSo52xh2aTsUeGUraxktN2jmNMlFVOjleW94sdma55HCzg2+umvrTv3RfHTKtqnFtrpk7sviJrKmWrbG9kXZsiZnFi4hznOOnLNZT0y3yyTVS3yyWwKyT8lax3Y+KsmEkssuWwHZB32dxxsb28rblBOhTeSGdKk8s0w7DwwkvpJZYZLaOBa8eYeDcdFp+NFcxNPx4r9eyV2ckqjFatY1soJF2kEObpZ2m7w6KWpy2+4lrcsYkS6lJAgMLACApO2+zhdeohbr/eNHH8wHPn/V+Tr9HufqROdq9Nu90SP2U2w7K0NSSWbmv3lvR3MdeH000mt2vbMi02r2+yRKbT7EwVv20DhHK4Xzt1jf+oDf+ofNeo0nkHX3yixdpYWrKPN8VwOroye3hdlH943vx/5hu87LvU6um39Wci7STh2cLK7qrCwis6+OT79+6rODVVywX32dYlDBTVFRLIAM7W23v0bcWaNTfNoOi4fk4ystjCJ2fHYri2zfUy4nibssTXUlMfvP7szh4b/LQdSoY/j6de73SJ5era8LhHPNVU+GD3XDm9tWSd1z7Z3A9T/x3Dj15Ot8hK14X/wzxUtsOWWbY7Zv3RjnynPUS6yvPePPKD/Vz5Wiop2LL7LFNW1Zl2yxqwTmVgBZB8SPDQS4gAbyTYLGQVbGK5lPiULp7COSF0bHH4Wvzhx8Liw9FXskozWSvOSU1kl8SrjHNTRMt9q9wI/w2xPcbctQz1Usp4aX2byfKSJNSdEnSPpDIQFH20mqZquGhgl7FkjHOMguCSM123GugbuB+8qd7k5KCeMlS9yclFPGSFno/dYixlJWir3Nlje+SJzuDszTlc3iWlvRRbdiSS5I9u1Ljk9Fwp0hhjM4AkLG5wNwdbXd1V6De33F2PXJ2LY2QWQEAWAUzajYoTEy01mv3lh0Y49Pwn5fVc7U6FT5gUL9GpcxKZS4tWYc/J3m843i8Z6j92qlCy2h8lSE7KXyW7DfaRTvFqiN0Z5j7Rny1+S6Fevi/wBuC5DWQkvdwdUlRg1R3nmlJPFwbE71Nir1fkcfrM2bomc7sPwJupNN/wCQO+WZTvyli7mY9KhGl+1uE0n9mia53+FEGernAX+apXeQT5byw7qYfqiOOLYnindpo+wgOhfcjT9e8+DR4qt6lt368I132W/rwWzZbZSGhbdvflI70hHe8G/hHT6qzVQoFmqlQLCpyYIAgCApW0mHyYiaiNspZHT91rB9+bIJLv8AyjMBbnc8AqlsZWN4fRVtjKxvHwRlDicGI4dkqgXSxOjYSDaTvPbG2Rp4nva33kHmo4TjbD3dojjKNkPd2WLZrZJtI/tHTvmeG5GF/wALGcmi5spqqFB5J6qVHks6sk4QBAcOJ4ZFUNDZm3sbtIJa9p/E1w1afBaygpdmkoRlwyv7UYlLh9M1kT3zSyPyRukyuLb+AGbpfmq909i/shtm4Rx8kD2ckTHGtOIPqNbdmXCG+uXs3Rmw8/RQ4eMy7IkmlmXZO4BtIIqZoxCUiUaOJY5xAv3e0LW2a6xG/wA9VNXdtWJksLVj3dlrhkD2hzSC0gEEagg6ghWU8lhPJ9rJkJ0Ag/wc9ZRRzNyyxte3k4Bw+a0lCMuGjWUIy7KvX+zqjk1YZIzya7M30cD9VVloa30VpaSv4IiT2Vg7qwgdY7n/AHhR/g/TI/wvpmyn9lcQ/wD0qXu/S1rPrmWy0X9my0a+WT+F7EUMFiIA9w+9Ie0+R7o8gp4aWuPOCaGnhH4LG1ttAp19E/8AgygCyCExXaqmpiWveS5vxBjXSZf1ECzfMqGV0IvDIpXRi8HRimOQU7GPlfYSOa1nM5iNfAA3JWZ2xisszOyMVkpeL4/XRu99a4GlbM6LsgBqxrspcTbiQR0NlVlbNe74K0rJ8S+DfW4ucOr5JZA401U1rw4C9ntaB/Q/MOSObrnn4Yc3Cefhm/ZTY+EspqqRrmyBgcWXswm+ZjnC17gZfQLemhYUmbVUJrcy8q52WzKAIAgMIDgxfCoqqPs5m3FwQRo5rhuc0jcVpZWpGs61I0UNHLBcyVbpImg6SNYHgDi6QAX8wtVFxXL4NVGUe3wUnGquoxeUw0bbU0bhneTkY92+5I1I5AdCeFqljle8R6Kk27Xtj0b63EKunqIKSmqWyP7odC2JrYWRgCwLjd4067vnmU5wkoRZtulGSgmeiBX10XOkQ1ZtHEyUwMZJNINXMibnyjhmJIa3wuoXalLBG7VnCOaj20o5HFrpDG5pyuEgygHXQu1aNx4rEdRBswr4tk/DM14zMcHA7iCCPUKZNNEqeUbFkyEAQC6DJD41iro3xwQNa6eW5aHEhjWt1L321t04qKdjTwuyKc8PC7NuDQVLQ73qZsjie6GNyMa36k+KzBSX7M2gn0yRfextv4crrZ9ZRs+uDzrZ3amGmiNJXxPjkzP7RzmZmvLnElzuJ323EfwpV3qC2zRThZtW2ZLbSYLT19K+anIe4RgQlpuwZCXZWtHwk7j5clJbCFsN0TeyCthlEHhldFPhLKNrw6eRxaGDvPzdsXl7gNwA71zyUUHupUPkjrlmraeje6syNY5oc1trAgO3bt6vbeMFxR4wdC2NggCAIAgMIAgPiRgILXAEHQg6gjlbisYMf0cM1EYqd8dGxkbsruzAAawPN7G3itHFpYiatcYiV3YjCJqYkzUzu2kJMs73xu0uSAzK5xPnb6BQaeuUeZLkgphJfsuS5q0Win7Uzw4bTyOp2ZZqh1gblzy83u83JJtc+ZHNVbnGqPtXLK1rVceFyzXsPSshh90mp5Wyvu6QvjzRuP6xdpAFhqfqlEcLEkYojiOJLkkKR9Ph7WUkDXySG7hGwB0p5vedGtHC5I3KRbILEeyRYh7UKDaxr6kUslPNHKbmzshaBYm5LXFYjqMy2tGIX5ltfZtG1tOahkAzkyEhkgb9iSN9nfe3bxcLPrx3bTPrR3YPlu19O+V0ULZJnNBJ7NuZumlg4kA68d3VPXWcD1lnBAbKY3WSz1T2wvlaZA1rXSNjbEA5/dtc8CL5QdygpsnKTaRDVZOUm0fGNYoYMXc/LmcKcMjZ+J7nd1v+ZyxZNxt+zE5uNp2bO11W3Epaapn7QdkH2DQ1od3DZvIDMR1W9U5+ptbNq5T9TEi7q4WyExrEqEZo6qSElu+N+VztRcd068RuUNkq+pEM5QziRy7D4X2EUpDXMZLK58cbvibGbBtwdxIG7wWtENqeDFMNqeDi2Sw1sFfXMa0ZbxOabagPDnFoPK/DoFpTDFsjSqGJyLkrZaMoAgCAIAgCAIAgCAIDkxGB74y2KXs3Hc/KH28joVrJGslko02EV8NQ2oqIm12T4CHdm9n5hHbLfyJ0CpuuxS3NZKkoWRecZLXhmMPma5xpJog1pP2gDSXfhaLknjqrEZuSzgsKTa5RSNi8ca1s8xBmrJ3nuC+jQBYucdGMBJ8gOSqVW4Tb7KtViWW+zdsJI2WSesq3gund2LBqC69szWjfa2QdA09Vtp8Nub+TNDy3Jrs+saoPfMXZTsOSOCIZ8vds072ttuuHtb4LE4qd2PoSjvtx9HoENOyNgaxoa1osABYAcgru1JFzCSKH7NMSjZA7O77SaoIawavN2tubchqSVU0sopFXTSSRvqqdr8fjzC+WHMPEBwF/VZcc3GXF+tk3Yjh1WzFHT08QcJIgwPc4BjDoMzhvNsoNuP0ShNXZRmUJK3KLfSQlkbGFxcWta3MfiNgBc9SriWEWUmkaBhMAlM3YM7Q6l+UF97W3nUblrsjnJrsjk+sUZK6Jzad4ZIdGucLga6m1jfS+izJPHBmaeODTgmFinYQXukkec0kjvie61r9AAAABuAWK4bTFccEktzcygCAIAgCAIAgCAIDCAIAsfACzgGllOxt8rGjN8VgBfx5rXajCijjw3AaancXQwMY4/eA18AeA6BaxrjHpGsa4x6R90mDwxTSTsZaST43Xcb+RNh5LKhFPcFBJ5O5b8YN+MHBQYLTwOc+GBjHO3kDXwHIdNyjjXGLyjSMIx6O4MAJNhc7zxW7NsI+lkyEAQBAEAQGUAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf/Z" // Replace with your image path (e.g., a logo PNG in the public folder)
              alt="ConstructCRM Logo" 
              className="h-6 w-6 object-cover" 
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">ConstructCRM</h1>
            <p className="text-sm text-gray-400">Project Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gray-600 p-2 rounded-full">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;