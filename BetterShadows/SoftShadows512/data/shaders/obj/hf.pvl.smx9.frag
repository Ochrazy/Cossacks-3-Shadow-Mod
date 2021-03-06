uniform sampler2D texUnit0;
uniform sampler2D texUnit1;
uniform sampler2DShadow texShadow;
uniform int fogMode;
uniform int shadowed;
uniform vec4 shadowColor;
//uniform int shadowSize;

void main()
{
   // base textures operations
   vec4 color;
   color.rgb=texture2D(texUnit0, gl_TexCoord[0].xy).rgb;
   color.a=texture2D(texUnit1, gl_TexCoord[1].xy).a;

   // lighting operations
   color.xyz=color.xyz*gl_TexCoord[4].xyz+gl_TexCoord[5].xyz;

   // shadow operations
   if(shadowed==1)
   {
   // BETTER SHADOWS MOD ------------------------------------------------
       const float of=1.0/512.0;
      //float of=1.0/(shadowSize*0.25);
      float sh=0.0;

	  // Poisson Sampling
	  float spread = 512.0;
      sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( 0.95581, -0.18159, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( 0.50147, -0.35807, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( 0.69607, 0.35559, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( -0.0036825, -0.59150, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( 0.15930, 0.089750, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( -0.65031, 0.058189, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( 0.11915, 0.78449, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( -0.34296, 0.51575, 0.0, 0.0)/spread).r<0.999?0.0:1.0;
	  sh+=shadow2DProj(texShadow, gl_TexCoord[3]+vec4( -0.60380, -0.41527, 0.0, 0.0)/spread).r<0.999?0.0:1.0;

      sh=sh/9.0;
      color.xyz*=(sh+shadowColor.xyz*(1.0-sh)).xyz;
   // BETTER SHADOWS MOD ------------------------------------------------
   }

   // fog operations
   if(fogMode>0)
   {
      // find fog
      float fog=1.0;
      if (fogMode==1) //LINEAR
      fog=clamp((gl_Fog.end-gl_TexCoord[0].w)*gl_Fog.scale, 0.0, 1.0);
      else
      if (fogMode==2) //EXP
      fog=clamp(exp2(-gl_Fog.density*gl_TexCoord[0].w*1.442695), 0.0, 1.0);
      else
      if (fogMode==3) //EXP2
      fog=clamp(exp2(-pow(gl_Fog.density*gl_TexCoord[0].w, 2.0)*1.442695), 0.0, 1.0);
      color.xyz=mix(gl_Fog.color.xyz, color.xyz, fog).xyz;
   }

   // final operation
   gl_FragColor=color;
}