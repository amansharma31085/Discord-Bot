
const tracker=new Map();
function track(id){
 const now=Date.now();
 const arr=tracker.get(id)||[];
 arr.push(now);
 const filtered=arr.filter(t=>now-t<5000);
 tracker.set(id,filtered);
 return filtered.length;
}
module.exports={track};
