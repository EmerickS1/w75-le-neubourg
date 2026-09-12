export const dynamic="force-dynamic";

export async function GET(){
  const day=new Date().toISOString().slice(0,10);
  try{
    const response=await fetch(`https://api.sofascore.com/api/v1/sport/tennis/scheduled-events/${day}`,{
      cache:"no-store",
      headers:{Accept:"application/json","User-Agent":"Mozilla/5.0"}
    });
    if(!response.ok) return Response.json({events:[],available:false},{status:502});
    const data=await response.json() as {events?:unknown[]};
    return Response.json({events:data.events||[],available:true},{headers:{"Cache-Control":"no-store"}});
  }catch{
    return Response.json({events:[],available:false},{status:502});
  }
}
