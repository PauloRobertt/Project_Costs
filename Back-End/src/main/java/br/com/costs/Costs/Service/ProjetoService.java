package br.com.costs.Costs.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.costs.Costs.DTO.ProjetoDTO;
import br.com.costs.Costs.DTO.ServicoDTO;
import br.com.costs.Costs.Model.Projeto;
import br.com.costs.Costs.Repository.ProjetoRepository;

@Service
public class ProjetoService {
	
	@Autowired
	private ProjetoRepository repository;
	
	public Projeto ListarPorID(Long id){
		Optional<Projeto> optionalProjeto = repository.findById(id);
		return optionalProjeto.orElseThrow(() -> new ObjectNotFoundException("Projeto não encontrado!", optionalProjeto));
	}
	
	public List<ProjetoDTO> ListarProjeto(){
		List<Projeto> projetos = repository.findAll();
		
	    return projetos.stream()
                
		        .map(projeto -> new ProjetoDTO(
		        		projeto.getId(),
		        		projeto.getNome(),
		        		projeto.getOrcamento(),
		        		projeto.getCategoria(),
		        		projeto.getTotalUtilizado(),
		        		projeto.getServicos().stream()
	                        .map(servico -> new ServicoDTO(
	                        		servico.getId(),
	                        		servico.getNome(),
	                        		servico.getCusto(),
	                        		servico.getDescricao(),
	                        		servico.getProjeto().getId()
	                        ))
	                        .collect(Collectors.toList())
		        ))
		        .collect(Collectors.toList());
	}
	
	public ResponseEntity<String> CriarProjeto(ProjetoDTO data){
		try {
			Projeto projeto = new Projeto();
			projeto.setNome(data.nome());
			projeto.setCategoria(data.categoria());
			projeto.setOrcamento(data.orcamento());
			projeto.setTotalUtilizado(0);
			
			repository.save(projeto);
			
			return ResponseEntity.ok("{\"mensagem\": \"Projeto criado com sucesso\"}");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Erro ao criar o projeto: " + e.getMessage());
		}
	}
	
	public ResponseEntity<String> EditarProjeto(Long id, ProjetoDTO data) {
		try {
			Optional<Projeto> optionalProjeto = repository.findById(id);
			
			if(!optionalProjeto.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado");
			}
			
			Projeto projeto = optionalProjeto.get();
			
			projeto.setNome(data.nome());
			projeto.setCategoria(data.categoria());
			projeto.setOrcamento(data.orcamento());
			
			repository.save(projeto);
			
			return ResponseEntity.ok().build();
		}
		
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Erro ao editar o projeto: " + e.getMessage());
		}
	}
	
	public ResponseEntity<?> ExcluirProjeto(Long id){
		try {
			Optional<Projeto> optionalProjeto = repository.findById(id);
			
			if(!optionalProjeto.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado");
			}
			
			Projeto projeto = optionalProjeto.get();
			
			repository.deleteById(projeto.getId());;
			
			return ResponseEntity.ok().build();
		}
		
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Erro ao editar o projeto: " + e.getMessage());
		}
	}
}
