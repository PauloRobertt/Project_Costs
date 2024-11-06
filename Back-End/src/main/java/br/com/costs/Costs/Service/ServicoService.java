package br.com.costs.Costs.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.costs.Costs.DTO.ServicoDTO;
import br.com.costs.Costs.Model.Projeto;
import br.com.costs.Costs.Model.Servico;
import br.com.costs.Costs.Repository.ProjetoRepository;
import br.com.costs.Costs.Repository.ServicoRepository;

@Service
public class ServicoService {
	
	@Autowired
	private ServicoRepository repository;
	@Autowired
	private ProjetoRepository projetoRepository;
	
	public List<ServicoDTO> ListarServico(){
		List<Servico> servicos = repository.findAll();
	    return servicos.stream()
	        .map(servico -> new ServicoDTO(
	        		servico.getId(),
	        		servico.getNome(),
	        		servico.getCusto(),
	        		servico.getDescricao(),
	        		servico.getProjeto().getId()
	        ))
	        .collect(Collectors.toList());
	}
	
	public ResponseEntity<String> CriarServico(ServicoDTO data) {
	    try {
	        Servico servico = new Servico();
	        
	        Optional<Projeto> optionalProjeto = projetoRepository.findById(data.projetoID());
	        if (!optionalProjeto.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado");
	        }
	        
	        Projeto projeto = optionalProjeto.get();
	        
	        if ((projeto.getTotalUtilizado() + data.custo()) > projeto.getOrcamento()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Custo muito elevado!");
	        }
	        	
	        float totValue = projeto.getTotalUtilizado() + data.custo();
	        	
	        projeto.setTotalUtilizado(totValue);
	        servico.setNome(data.nome());
	        servico.setDescricao(data.descricao());
	        servico.setCusto(data.custo());
	        servico.setProjeto(projeto);
	        
	        repository.save(servico);
	        
	        return ResponseEntity.ok("Serviço criado com sucesso ID " + servico.getId());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Erro ao criar o serviço: " + e.getMessage());
	    }
	}
	
	public ResponseEntity<String> EditarServico(Long id, ServicoDTO data) {
		try {
			Optional<Servico> optionalServico = repository.findById(id);
			
			if(!optionalServico.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado");
			}
			
			Servico servico = optionalServico.get();
			Projeto projeto = servico.getProjeto();
				
			float custoAntigo = servico.getCusto();
			float custoNovo = data.custo();
			
	        if ((projeto.getTotalUtilizado() - custoAntigo + custoNovo) > projeto.getOrcamento()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Custo muito elevado!");
	        }
	        
	        projeto.removerCustoServico(custoAntigo);
	        projeto.adicionarCustoServico(custoNovo);
	        projetoRepository.save(projeto);
			
			servico.setNome(data.nome());
			servico.setCusto(data.custo());
			servico.setDescricao(data.descricao());
			
			repository.save(servico);
			
			return ResponseEntity.ok().build();
		}
		
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Erro ao editar o serviço: " + e.getMessage());
		}
	}
	
	public ResponseEntity<?> ExcluirServico(Long id){
		try {
			Optional<Servico> optionalServico = repository.findById(id);
			
			if(!optionalServico.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Servico não encontrado");
			}
			
			Servico servico = optionalServico.get();
			Projeto projeto = servico.getProjeto();
			
			float totValue = projeto.getTotalUtilizado() - servico.getCusto();
			
			projeto.setTotalUtilizado(totValue);
			
			repository.deleteById(id);;
			
			return ResponseEntity.ok().build();
		}
		
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Erro ao editar o servico: " + e.getMessage());
		}
	}
}
