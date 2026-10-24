import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('.',import.meta.url));
function git(...args){
 const result=spawnSync('git',args,{cwd:root,encoding:'utf8',windowsHide:true,maxBuffer:8*1024*1024});
 if(result.error)throw result.error;
 if(result.status!==0)throw new Error(result.stderr.trim()||result.stdout.trim()||'Git command failed');
 return result.stdout.trim();
}
try{
 if(git('status','--porcelain'))throw new Error('Commit all changes before publishing.');
 if(git('branch','--show-current')!=='main')throw new Error('Publish from the main branch.');
 const origin=git('remote','get-url','origin');
 if(!['https://github.com/urpig/K12-yujen.git','https://github.com/urpig/K12-yujen','git@github.com:urpig/K12-yujen.git'].includes(origin))throw new Error('The origin does not match urpig/K12-yujen.');
 const sourceCommit=git('rev-parse','HEAD');
 const remoteMain=git('ls-remote','origin','refs/heads/main').split(/\s+/)[0];
 if(remoteMain!==sourceCommit)throw new Error('Push main and resolve any remote changes before publishing.');
 const pagesCommit=git('subtree','split','--prefix=dist','HEAD');
 if(!/^[a-f0-9]{40}$/.test(pagesCommit))throw new Error('Invalid Pages commit.');
 const sourceTree=git('rev-parse','HEAD:dist');
 if(git('rev-parse',pagesCommit+'^{tree}')!==sourceTree)throw new Error('The Pages tree differs from dist.');
 git('push','origin',pagesCommit+':refs/heads/gh-pages');
 const remotePages=git('ls-remote','origin','refs/heads/gh-pages').split(/\s+/)[0];
 if(remotePages!==pagesCommit)throw new Error('Remote Pages commit verification failed.');
 console.log(JSON.stringify({sourceCommit,pagesCommit,sourceTree,expectedUrl:'https://urpig.github.io/K12-yujen/',next:'Confirm GitHub Pages deployment and test the public URL.'},null,2));
}catch(error){console.error(error.message);process.exitCode=1;}
