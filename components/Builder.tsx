import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeData, Experience, Skill } from '../types';
import { Plus, Trash2, Github, Twitter, Globe, Sparkles, Loader2, ChevronRight, ChevronLeft, Terminal } from 'lucide-react';
import { auditResume } from '../services/gemini';

interface BuilderProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const Builder: React.FC<BuilderProps> = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'xp' | 'skills'>('profile');
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // -- Handlers --

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    const newXp: Experience = {
      id: crypto.randomUUID(),
      role: '',
      company: '',
      isWeb3: false,
      duration: '',
      description: ''
    };
    setData(prev => ({ ...prev, experience: [...prev.experience, newXp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(xp => xp.id === id ? { ...xp, [field]: value } : xp)
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(xp => xp.id !== id)
    }));
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        name: e.currentTarget.value.toLowerCase(),
        category: 'tech' // Default to tech
      };
      setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      e.currentTarget.value = '';
    }
  };

  const removeSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    const result = await auditResume(data);
    setAuditResult(result);
    setIsAuditing(false);
  };

  // -- Render Components --

  const ProfileForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs text-slate-500 lowercase">full_name</label>
        <input
          name="fullName"
          value={data.fullName}
          onChange={handleInputChange}
          className="w-full bg-surface border border-slate-800 p-3 text-sm focus:border-accent focus:outline-none text-slate-200 placeholder:text-slate-700 transition-colors"
          placeholder="satoshi nakamoto"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs text-slate-500 lowercase">bio / manifesto</label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleInputChange}
          rows={4}
          className="w-full bg-surface border border-slate-800 p-3 text-sm focus:border-accent focus:outline-none text-slate-200 placeholder:text-slate-700 resize-none transition-colors"
          placeholder="briefly explain your proof of work..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-slate-500 lowercase flex items-center gap-1"><Github size={12}/> github</label>
          <input
            name="github"
            value={data.github}
            onChange={handleInputChange}
            className="w-full bg-surface border border-slate-800 p-2 text-sm focus:border-accent focus:outline-none"
            placeholder="username"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-500 lowercase flex items-center gap-1"><Twitter size={12}/> twitter</label>
          <input
            name="twitter"
            value={data.twitter}
            onChange={handleInputChange}
            className="w-full bg-surface border border-slate-800 p-2 text-sm focus:border-accent focus:outline-none"
            placeholder="@handle"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-500 lowercase flex items-center gap-1"><Globe size={12}/> website</label>
          <input
            name="website"
            value={data.website}
            onChange={handleInputChange}
            className="w-full bg-surface border border-slate-800 p-2 text-sm focus:border-accent focus:outline-none"
            placeholder="url"
          />
        </div>
      </div>
    </div>
  );

  const XPForm = () => (
    <div className="space-y-8">
      {data.experience.map((xp, index) => (
        <motion.div 
          key={xp.id} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative pl-4 border-l-2 border-slate-800 hover:border-accent transition-colors group"
        >
          <button onClick={() => removeExperience(xp.id)} className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 bg-background p-1 hover:bg-surface border border-transparent hover:border-red-900 rounded">
            <Trash2 size={14} />
          </button>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              value={xp.role}
              onChange={(e) => updateExperience(xp.id, 'role', e.target.value)}
              className="bg-transparent border-b border-slate-800 focus:border-accent focus:outline-none py-1 text-sm w-full"
              placeholder="role / title"
            />
            <input
              value={xp.company}
              onChange={(e) => updateExperience(xp.id, 'company', e.target.value)}
              className="bg-transparent border-b border-slate-800 focus:border-accent focus:outline-none py-1 text-sm w-full"
              placeholder="dao / protocol / company"
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <input
              value={xp.duration}
              onChange={(e) => updateExperience(xp.id, 'duration', e.target.value)}
              className="bg-transparent border-b border-slate-800 focus:border-accent focus:outline-none py-1 text-xs w-1/3 text-slate-400"
              placeholder="2022 - present"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-slate-500 lowercase">web3_native?</span>
              <div 
                onClick={() => updateExperience(xp.id, 'isWeb3', !xp.isWeb3)}
                className={`w-8 h-4 rounded-full transition-colors relative ${xp.isWeb3 ? 'bg-accent' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${xp.isWeb3 ? 'left-4.5' : 'left-0.5'}`} style={{ left: xp.isWeb3 ? 'calc(100% - 14px)' : '2px' }} />
              </div>
            </label>
          </div>

          <textarea
            value={xp.description}
            onChange={(e) => updateExperience(xp.id, 'description', e.target.value)}
            className="w-full bg-surface/50 border border-slate-800 p-2 text-xs focus:border-accent focus:outline-none text-slate-300 resize-none h-20"
            placeholder="contributions and achievements..."
          />
        </motion.div>
      ))}
      
      <button 
        onClick={addExperience}
        className="w-full py-3 border border-dashed border-slate-700 text-slate-500 hover:text-accent hover:border-accent transition-colors text-xs lowercase flex items-center justify-center gap-2"
      >
        <Plus size={14} /> add position block
      </button>
    </div>
  );

  const SkillsForm = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs text-slate-500 lowercase">add skill (press enter)</label>
        <input
          onKeyDown={addSkill}
          className="w-full bg-surface border border-slate-800 p-3 text-sm focus:border-accent focus:outline-none text-slate-200"
          placeholder="solidity, react, rust, community management..."
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {data.skills.map(skill => (
          <span 
            key={skill.id} 
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-slate-700 rounded-full text-xs text-slate-300 group"
          >
            {skill.name}
            <button onClick={() => removeSkill(skill.id)} className="text-slate-500 hover:text-red-400">
              <Plus size={12} className="rotate-45" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Editor Section */}
      <div className="h-full flex flex-col border-r border-slate-800 bg-background/50 backdrop-blur-sm z-10">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
           <span className="text-accent font-bold tracking-tight lowercase">vibecode builder_v1</span>
           
           <div className="flex gap-2">
             {['profile', 'xp', 'skills'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-3 py-1 text-xs transition-colors lowercase border ${activeTab === tab ? 'border-accent text-accent bg-accent/10' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
               >
                 {tab}
               </button>
             ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <ProfileForm />}
              {activeTab === 'xp' && <XPForm />}
              {activeTab === 'skills' && <SkillsForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-slate-800 bg-surface/30">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 lowercase">ai resume auditor</span>
              <span className="text-[10px] text-slate-600 lowercase">powered by gemini 3</span>
            </div>
            <button
              onClick={handleAudit}
              disabled={isAuditing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent2 text-white text-xs font-bold lowercase hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isAuditing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isAuditing ? 'analyzing chain...' : 'get roasted'}
            </button>
          </div>
          
          {auditResult && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-black/40 border border-accent/20 rounded text-xs text-slate-300 font-mono leading-relaxed"
            >
              <div className="flex items-center gap-2 mb-2 text-accent">
                <Terminal size={12} />
                <span>audit_log.txt</span>
              </div>
              {auditResult.toLowerCase()}
            </motion.div>
          )}
        </div>
      </div>

      {/* Preview Section - Sticky on Desktop */}
      <div className="bg-[#050a1f] p-8 lg:p-12 overflow-y-auto flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-slate-800/50 p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent2" />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white lowercase tracking-tight mb-2">
              {data.fullName || 'anon builder'}
            </h1>
            <p className="text-sm text-slate-400 lowercase leading-relaxed mb-4">
              {data.bio || 'seeking alpha...'}
            </p>
            <div className="flex gap-4 text-xs text-accent font-mono lowercase">
              {data.github && <span className="hover:underline cursor-pointer">github.com/{data.github}</span>}
              {data.twitter && <span className="hover:underline cursor-pointer">@{data.twitter}</span>}
            </div>
          </div>

          {/* XP */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Experience</h3>
            <div className="space-y-6">
              {data.experience.length === 0 && <span className="text-xs text-slate-700 lowercase italic">no blocks mined yet...</span>}
              {data.experience.map(xp => (
                <div key={xp.id} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm text-slate-200 font-medium lowercase">
                      {xp.role} <span className="text-slate-500">@</span> {xp.company}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{xp.duration}</span>
                  </div>
                  {xp.isWeb3 && (
                    <span className="inline-block px-1.5 py-0.5 bg-accent/10 border border-accent/20 text-[9px] text-accent lowercase mb-2">
                      on-chain
                    </span>
                  )}
                  <p className="text-xs text-slate-400 lowercase leading-relaxed">
                    {xp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.length === 0 && <span className="text-xs text-slate-700 lowercase italic">loading modules...</span>}
              {data.skills.map(s => (
                <span key={s.id} className="text-xs text-slate-300 lowercase bg-slate-900 border border-slate-800 px-2 py-1">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Watermark */}
          <div className="mt-12 pt-4 border-t border-slate-900 text-center">
            <span className="text-[9px] text-slate-700 font-mono lowercase">verified by vibecode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;