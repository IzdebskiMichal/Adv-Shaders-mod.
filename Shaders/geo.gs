#version 330 core
layout (triangles) in;
layout (triangle_strip, max_vertices = 3) out;


in vec2 vTexCoords[];
in vec3 vNormal[] ;

out vec2 gTexCoords; 
out vec3 gNormal; 

uniform float time;

vec3 getSurfaceNormal()
{
	vec3 a = vec3(gl_in[0].gl_Position) - vec3(gl_in[1].gl_Position);
	vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[1].gl_Position);
	return normalize(cross(a,b));
}

vec4  explode(vec4 position, vec3 normal)
{
	float magnitude = 5.f;
	vec3 tempPos = normal * ((sin(time) + 1.0) / 2.0) * magnitude;
	return (position + vec4(tempPos,0.0));
}


void main() 
{    
    vec3 normal = getSurfaceNormal();
	gl_Position = (gl_in[0].gl_Position + gl_in[1].gl_Position + gl_in[2].gl_Position) / 3;
	gTexCoords = (vTexCoords[0] + vTexCoords[1] + vTexCoords[2]) / 3;
	gl_Position = explode(gl_Position, normal);
	EmitVertex();
  
    EndPrimitive();
}



